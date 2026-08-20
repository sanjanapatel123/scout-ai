import { chromium } from "playwright";

export interface ScrapedWebsite {
  url: string;
  title: string;
  description: string;
  content: string;
}

export const scrapeWebsite = async (url: string): Promise<ScrapedWebsite> => {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: 1440,
        height: 900,
      },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
    });

    // Don't let individual resources hang forever.
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000);

    console.log(`🌐 Opening: ${url}`);

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log(`✅ Website loaded: ${url}`);

    const title = await page.title();

    const description =
      (await page
        .locator('meta[name="description"]')
        .getAttribute("content")
        .catch(() => "")) || "";

    const content = await page
      .locator("body")
      .innerText()
      .catch(() => "");

    return {
      url,
      title,
      description,
      content: content.slice(0, 20000),
    };
  } finally {
    await browser.close();
  }
};
