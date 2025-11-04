import IORedis from "ioredis";

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retryStrategy(times) {
    return Math.min(times * 500, 5000);
  },
});

redisConnection.on("connect", () => console.log("✅ Worker connected to Redis"));
redisConnection.on("error", (err) => console.error("❌ Redis error in worker:", err));

export default redisConnection;
