import redisClient from "../config/redisClient.js";
import { Queue } from "bullmq";

const emailQueue = new Queue("emailQueue", {connection: redisClient});

export default emailQueue;      