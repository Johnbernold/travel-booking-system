import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || "redis",
        port: parseInt(process.env.REDIS_PORT || "6379"),
    },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();

export default redisClient;