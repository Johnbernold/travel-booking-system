import dbApi  from "../config/db.js";
import { ResultSetHeader } from "mysql2";
import { Airport , Airports} from "../types/airport.types.js";

export const AirportModel = {
  async create(data: Airport): Promise<Airport> {
    const { code, name, city, country } = data;

    const [result] = await dbApi.query<ResultSetHeader>(
      "INSERT INTO airports (code, name, city, country) VALUES (?, ?, ?, ?)",
      [code, name, city, country]
    );

    return { id: result.insertId, code, name, city, country };
  },

  async getAll(): Promise<Airport[]> {
    const [rows] = await dbApi.query("SELECT * FROM airports ORDER BY name ASC");
    return rows as Airport[];
  },

  async findByCode(code: string): Promise<Airport | null> {
    const [rows] = await dbApi.query<Airports[]>("SELECT * FROM airports WHERE code = ?", [code]);
    return rows.length > 0 ? (rows[0] as Airport) : null;
  },

  async findById(id: number | string): Promise<Airport | null> {
    const [rows] = await dbApi.query<Airports[]>("SELECT * FROM airports WHERE id = ?", [id]);
    return rows.length > 0 ? (rows[0] as Airport) : null;
  },

  async delete(id: number | string): Promise<Airport> {
    const [rows] = await dbApi.query<Airports[]>("DELETE FROM airports WHERE id = ?", [id]);
    return rows[0] as Airport;
  },
};
