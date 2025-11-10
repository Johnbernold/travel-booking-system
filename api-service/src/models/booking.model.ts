import dbApi from "../config/db.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Booking , CreateBookingDTO } from "../types/booking.types.js";

export const BookingModel = {
  async create(data: CreateBookingDTO): Promise<Booking> {
    const [result] = await dbApi.query<ResultSetHeader>(
      `INSERT INTO bookings 
      (booking_reference, flight_id, user_id, total_amount, status_id)
      VALUES (?, ?, ?, ?, ?)`,
      [
        data.booking_reference,
        data.flight_id,
        data.user_id,
        data.total_amount,
        data.status_id,
      ]
    );

    const [rows] = await dbApi.query<Booking[]>(
      "SELECT * FROM bookings WHERE id = ?",
      [result.insertId]
    );
    return rows[0];
  },

  async findById(id: number) {
    const [rows] = await dbApi.query<Booking[]>(
      `SELECT b.*, bs.code AS status_code, bs.description AS status_description
       FROM bookings b
       JOIN booking_statuses bs ON b.status_id = bs.id
       WHERE b.id = ?`,
      [id]
    );
    return rows[0];
  },


};
