import  dbApi from "../config/db.js";
import { ResultSetHeader } from "mysql2";
import { Airplane } from "../types/airplane.types.js";

export const AirplaneModel = {
  async create(airplane: Omit<Airplane, "id">): Promise<Airplane> {
    const [result] = await dbApi.query<ResultSetHeader>(
      `INSERT INTO airplanes (model, capacity, airline_id, image_url)
       VALUES (?, ?, ?, ?)`,
      [airplane.model, airplane.capacity, airplane.airline_id, airplane.image_url]
    );

    const [rows] = await dbApi.query<Airplane[]>(
      `SELECT * FROM airplanes WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  },

  async findAll(): Promise<Airplane[]> {
    const [rows] = await dbApi.query<Airplane[]>(
      `SELECT a.*, al.name AS airline_name
       FROM airplanes a
       JOIN airlines al ON a.airline_id = al.id`
    );
    return rows;
  },

  async findById(id: number): Promise<Airplane | null> {
    const [rows] = await dbApi.query<Airplane[]>(`SELECT * FROM airplanes WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  async deleteById(id: number): Promise<boolean> {
    const [result] = await dbApi.query<ResultSetHeader>(
      `DELETE FROM airplanes WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  },
};
