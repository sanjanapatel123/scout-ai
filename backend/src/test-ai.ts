import dotenv from "dotenv";
import { extractCompanyData } from "./services/ai.service.js";

dotenv.config();

const test = async () => {
  const content = `
    Veloxio Technologies is a software development company.

    We build premium web applications and intelligent AI
    automation systems.

    Our services include:
    MERN development,
    AI integration,
    web automation,
    and web scraping.

    Contact: hello@veloxio.com

    Location: India
  `;

  try {
    const result = await extractCompanyData(content);

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ AI validation failed:");

    console.error(error);
  }
};

test();
