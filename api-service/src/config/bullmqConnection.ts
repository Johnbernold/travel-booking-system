import IORedis from "ioredis";

const bullConnection = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

export default bullConnection;
