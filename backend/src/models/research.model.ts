import mongoose, { Document, Schema } from "mongoose";

export type ResearchStatus = "pending" | "processing" | "completed" | "failed";

export interface IResearch extends Document {
  url: string;
  title?: string;
  companyName?: string;
  description?: string;
  industry?: string;
  services: string[];
  email?: string;
  phone?: string;
  location?: string;
  socialLinks: string[];
  aiSummary?: string;
  status: ResearchStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const researchSchema = new Schema<IResearch>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    industry: {
      type: String,
      trim: true,
    },

    services: {
      type: [String],
      default: [],
    },

    email: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    socialLinks: {
      type: [String],
      default: [],
    },

    aiSummary: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Research = mongoose.model<IResearch>("Research", researchSchema);
