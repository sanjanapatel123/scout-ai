import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const researchQueue = new Queue("research", {
  connection: redisConnection,
});
