import mysql2 from "mysql2/promise";
import dotenv from "dotenv";    
dotenv.config();
import logger from "./logger.js";

const dbApi = mysql2.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  connectionLimit: 10,
  waitForConnections: true,
  dateStrings: true,
  enableKeepAlive: true,
});

export async function getConnectionDB() {
    try {
        const connection = await dbApi.getConnection(); // test the connection
        logger.info("Connected to database in API_service");
        console.log("Connected to database");
        connection.release(); // release it back to the pool
    } catch (err) {
        logger.error("Error connecting to database: ", err);
        console.error("Error connecting to database: ", err);
    }
}


export default dbApi;