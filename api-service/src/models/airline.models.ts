import dbApi from "../config/db.js";
import { Airline } from "../types/airline.types.js";
import { ResultSetHeader } from "mysql2";


export const AirlineModel = {
  /**
   * Create a new airline record
   */
  async create(airline: Airline): Promise<Airline> {
    const { code, name, country, logo_url } = airline;

    const [result] = await dbApi.query<ResultSetHeader>(
      `INSERT INTO airlines (code, name, country, logo_url) VALUES (?, ?, ?, ?)`,
      [code, name, country || null, logo_url || null]
    );

    const [rows] = await dbApi.query<Airline[]>(
      `SELECT * FROM airlines WHERE id = ? LIMIT 1`,
      [result.insertId]
    );

    return rows[0];
  },

  /**
   * Get all airlines
   */
  async getAll(): Promise<Airline[]> {
    const [rows] = await dbApi.query<Airline[]>(
      `SELECT * FROM airlines ORDER BY name ASC`
    );
    return rows;
  },

  /**
   * Get airline by ID
   */
  async getById(id: number): Promise<Airline | null> {
    const [rows] = await dbApi.query<Airline[]>(
      `SELECT * FROM airlines WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows.length ? rows[0] : null;
  },

  /**
   * Delete airline by ID
   */
  async deleteById(id: number): Promise<boolean> {
    const [result] = await dbApi.query<any>(
      `DELETE FROM airlines WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  },
};
