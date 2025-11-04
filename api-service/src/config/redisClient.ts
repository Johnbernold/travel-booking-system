import IORedis from "ioredis";

const redisClient = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retryStrategy(times) {
    // Reconnect gradually up to 5s
    return Math.min(times * 500, 5000);
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});


export default redisClient;