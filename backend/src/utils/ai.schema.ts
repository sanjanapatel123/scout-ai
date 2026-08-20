import { z } from "zod";

export const extractedCompanySchema = z.object({
  companyName: z.string().default(""),
  description: z.string().default(""),
  industry: z.string().default(""),

  services: z.array(z.string()).default([]),

  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),

  socialLinks: z.array(z.string()).default([]),

  aiSummary: z.string().default(""),
});

export type ExtractedCompanyData = z.infer<typeof extractedCompanySchema>;
