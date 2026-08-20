import { Router } from "express";

import {
  createResearch,
  getResearches,
  getResearchById,
  deleteResearch,
} from "../controllers/research.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { createResearchSchema } from "../utils/research.schema.js";

const router = Router();

router.post("/", validate(createResearchSchema), createResearch);

router.get("/", getResearches);

router.get("/:id", getResearchById);

router.delete("/:id", deleteResearch);

export default router;
