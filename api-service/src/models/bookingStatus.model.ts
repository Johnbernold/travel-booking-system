import dbApi from "../config/db.js";
import { RowDataPacket } from "mysql2";

export interface BookingStatus extends RowDataPacket {
  id: number;
  code: string;
  description: string;
}

export const BookingStatusModel = {
  async findByCode(code: string): Promise<BookingStatus | null> {
    const [rows] = await dbApi.query<BookingStatus[]>(
      "SELECT * FROM booking_statuses WHERE code = ?",
      [code]
    );
    return rows[0] || null;
  },
};
