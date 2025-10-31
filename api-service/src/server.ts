import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redisClient from "./config/redisClient.js";


const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
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


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});