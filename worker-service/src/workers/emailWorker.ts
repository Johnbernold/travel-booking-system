import { Worker } from "bullmq";
import redisClient from "../config/redisClient.js";
import { mailService } from "../services/mailService.js";
import logger from "../config/logger.js";

export const emailWorker = new Worker(
    "emailQueue",
    async (job) => {
      const {type, to, subject, payload} = job.data;
      console.log(`🚀 Job started for ${type}`);
      logger.info(`🚀 Job started for ${type}`);
      await mailService(type, to, subject, payload);
    },
    {connection: redisClient}
);

emailWorker.on("active", (job) => {
  console.log(`⚙️ Job ${job.id} is active`);
  logger.info(`⚙️ Job ${job.id} is active`);
});

emailWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
  logger.info(`✅ Job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`❌ Job ${job?.id} failed with error ${err}`);
  logger.error(`❌ Job ${job?.id} failed with error ${err}`);
});
