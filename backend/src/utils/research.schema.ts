import { z } from "zod";

export const createResearchSchema = z.object({
  url: z.string().trim().url("Please provide a valid URL"),
});

export type CreateResearchInput = z.infer<typeof createResearchSchema>;
