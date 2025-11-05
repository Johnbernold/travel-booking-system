import IORedis from "ioredis";

const redisClient = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    return Math.min(times * 500, 5000);
  },
});

redisClient.on("connect", () => console.log("✅ Worker connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis error in worker:", err));

export default redisClient;
