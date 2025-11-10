import dbApi from "../config/db.js";
import { RowDataPacket } from "mysql2";

export interface Gender extends RowDataPacket {
  id: number;
  code: string;
  description: string;
}

export const GenderModel = {
  async findAll() {
    const [rows] = await dbApi.query<Gender[]>("SELECT * FROM genders");
    return rows;
  },
};
