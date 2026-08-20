import dotenv from "dotenv";
import { Worker } from "bullmq";

import { redisConnection } from "../config/redis.js";
import { connectDatabase } from "../config/database.js";
import { Research } from "../models/research.model.js";
import { scrapeWebsite } from "../services/scraper.service.js";
import { extractCompanyData } from "../services/ai.service.js";

dotenv.config();

const startWorker = async (): Promise<void> => {
  await connectDatabase();

  const worker = new Worker(
    "research",
    async (job) => {
      const { researchId, url } = job.data;

      console.log(`🔎 Processing research job: ${researchId}`);
      console.log(`🌐 URL: ${url}`);

      try {
        // 1. Mark as processing
        await Research.findByIdAndUpdate(researchId, {
          status: "processing",
          errorMessage: null,
        });

        // 2. Scrape website
        console.log("🌐 Scraping website...");

        const scrapedData = await scrapeWebsite(url);

        console.log(`✅ Website scraped: ${scrapedData.title}`);

        // 3. AI extraction
        console.log("🤖 Extracting information with Qwen...");

        const aiData = await extractCompanyData(scrapedData.content);

        console.log("✅ AI extraction completed");

        // 4. Save result
        await Research.findByIdAndUpdate(researchId, {
          title: scrapedData.title,
          description: aiData.description || scrapedData.description,

          companyName: aiData.companyName,
          industry: aiData.industry,
          services: aiData.services || [],
          email: aiData.email,
          phone: aiData.phone,
          location: aiData.location,
          socialLinks: aiData.socialLinks || {},
          aiSummary: aiData.aiSummary,

          status: "completed",
          errorMessage: null,
        });

        console.log(`✅ Research completed: ${researchId}`);

        return {
          success: true,
          researchId,
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown research error";

        console.error(`❌ Research failed: ${researchId}`);
        console.error(message);

        await Research.findByIdAndUpdate(researchId, {
          status: "failed",
          errorMessage: message,
        });

        throw error;
      }
    },
    {
      connection: redisConnection,
      concurrency: 2,
    },
  );

  worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
  });

  worker.on("failed", (job, error) => {
    console.error(`❌ Job ${job?.id} failed:`, error.message);
  });

  console.log("🚀 Research worker started");
};

startWorker();
