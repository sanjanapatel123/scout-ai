import express from "express";
import cors from "cors";

import researchRoutes from "./routes/research.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ScoutAI API is running",
    data: null,
  });
});

app.use("/api/research", researchRoutes);

// Must be last
app.use(errorHandler);

export default app;
