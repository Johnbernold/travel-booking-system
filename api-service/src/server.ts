import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redisClient from "./config/redisClient.js";
import {getConnectionDB}  from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import airportRouter from "./routes/airport.routes.js";
import airlineRouter from "./routes/airline.routes.js";
import airplaneRouter from "./routes/airplane.routes.js";

import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookiePrase from "cookie-parser";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePrase());
const corsOptions = {
  origin:  process.env.CLIENT_URL || "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors({ ...corsOptions }));

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

await getConnectionDB();


//Adding all routes here
app.use("/api/auth", authRouter);
app.use("/api/airport", airportRouter);
app.use("/api/airlines", airlineRouter);
app.use("/api/airplanes", airplaneRouter);


// catch-all 404 handler (fix)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handling Middleware (MUST be last)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});