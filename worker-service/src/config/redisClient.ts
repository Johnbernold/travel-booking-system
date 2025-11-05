import IORedis from "ioredis";
import logger from "./logger.js";

const redisClient = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    return Math.min(times * 500, 5000);
  },
});

redisClient.on("connect", () => {
  logger.info("✅ Worker connected to Redis successfully!");
  console.log("✅ Worker connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  logger.error("❌ Redis connection error in worker:", err);
  console.error("❌ Redis connection error in worker:", err);
});

export default redisClient;
