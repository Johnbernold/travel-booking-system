import mysql2 from "mysql2/promise";
import dotenv from "dotenv";    
dotenv.config();

const dbWorker = mysql2.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  connectionLimit: 10,
  waitForConnections: true,
  dateStrings: true,
});

export async function getConnectionDBWorker() {
    try {
        const connection = await dbWorker.getConnection(); // test the connection
        console.log("Connected to database in worker");
        connection.release(); // release it back to the pool
    } catch (err) {
        console.error("Error connecting to database: ", err);
    }
}


export default dbWorker;