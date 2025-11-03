import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redisClient from "./config/redisClient.js";
import {getConnectionDBWorker}  from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello from TypeScript + ES6 + Nodemon!");
});


app.get("/redis", async (req, res) => {
  try {
    await redisClient.set("greeting", "Hello from Redis!");
    const value = await redisClient.get("greeting");
    res.send(`🧠 Redis says: ${value}`);
  } catch (err) {
    res.status(500).send("Redis error: " + err);
  }
});

await getConnectionDBWorker();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
