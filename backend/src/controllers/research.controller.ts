import { Request, Response } from "express";
import { Research } from "../models/research.model.js";
import { researchQueue } from "../queues/research.queue.js";
import { isValidObjectId } from "../utils/object-id.js";

export const createResearch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({
        success: false,
        message: "URL is required",
      });

      return;
    }

    const research = await Research.create({
      url,
      status: "pending",
    });

    await researchQueue.add("scrape-website", {
      researchId: research._id.toString(),
      url,
    });

    res.status(202).json({
      success: true,
      message: "Research job queued successfully",
      data: {
        id: research._id,
        url: research.url,
        status: research.status,
      },
    });
  } catch (error) {
    console.error("Create research error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create research job",
    });
  }
};

export const getResearches = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const [researches, total] = await Promise.all([
      Research.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      Research.countDocuments(),
    ]);

    const data = researches.map((research) => ({
      id: research._id.toString(),
      websiteUrl: research.url,
      companyName: research.companyName ?? null,
      industry: research.industry ?? null,
      location: research.location ?? null,
      description: research.description ?? null,
      aiSummary: research.aiSummary ?? null,
      services: research.services ?? [],
      email: research.email ?? null,
      phone: research.phone ?? null,
      socialLinks: research.socialLinks ?? {},
      status: research.status,
      createdAt: research.createdAt,
      updatedAt: research.updatedAt,
    }));

    res.status(200).json({
      success: true,
      message: "Researches fetched successfully",
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get researches error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch researches",
    });
  }
};

export const getResearchById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid research ID",
        data: null,
      });

      return;
    }

    const research = await Research.findById(id).lean();

    if (!research) {
      res.status(404).json({
        success: false,
        message: "Research not found",
        data: null,
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Research fetched successfully",
      data: research,
    });
  } catch (error) {
    console.error("Get research error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch research",
      data: null,
    });
  }
};

export const deleteResearch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid research ID",
        data: null,
      });

      return;
    }

    const research = await Research.findByIdAndDelete(id);

    if (!research) {
      res.status(404).json({
        success: false,
        message: "Research not found",
        data: null,
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Research deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Delete research error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete research",
      data: null,
    });
  }
};
