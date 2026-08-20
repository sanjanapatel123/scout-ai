import ollama from "ollama";
import {
  extractedCompanySchema,
  ExtractedCompanyData,
} from "../utils/ai.schema.js";

const cleanJsonResponse = (content: string): string => {
  return content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

export const extractCompanyData = async (
  websiteContent: string,
): Promise<ExtractedCompanyData> => {
  const prompt = `
You are an intelligent web research assistant.

Extract company information from the website content below.

Return ONLY valid JSON.

The JSON MUST exactly follow this structure:

{
  "companyName": "",
  "description": "",
  "industry": "",
  "services": [],
  "email": "",
  "phone": "",
  "location": "",
  "socialLinks": [],
  "aiSummary": ""
}

STRICT RULES:

1. services MUST be an array of strings.
2. socialLinks MUST be an array of strings.
3. Do NOT return objects inside arrays.
4. Do NOT invent information.
5. If information is unavailable, use an empty string.
6. If there are no services, return [].
7. Do not include markdown.
8. Do not include explanations.
9. Return JSON only.

Website content:

${websiteContent}
`;

  const response = await ollama.chat({
    model: "qwen2.5:1.5b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const cleanedResponse = cleanJsonResponse(response.message.content);

  const parsedResponse = JSON.parse(cleanedResponse);

  const validatedResponse = extractedCompanySchema.parse(parsedResponse);

  return validatedResponse;
};
