import IORedis from "ioredis";
import logger from "./logger.js";

const redisClient = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retryStrategy(times) {
    // Reconnect gradually up to 5s
    return Math.min(times * 500, 5000);
  },
});

redisClient.on("connect", () => {
  logger.info("✅ Connected to Redis successfully!");
  console.log("✅ Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  logger.error("❌ Redis connection error:", err);
  console.error("❌ Redis connection error:", err);
});


export default redisClient;