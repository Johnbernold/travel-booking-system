import dbApi from "../config/db.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Passenger } from "../types/passenger.types.js";

export const PassengerModel = {
  async createMany(passengers: Omit<Passenger, "id">[]) {
    const values = passengers.map((p) => [
      p.booking_id,
      p.first_name,
      p.last_name,
      p.age,
      p.gender_id,
    ]);

    await dbApi.query<ResultSetHeader>(
      `INSERT INTO passengers 
       (booking_id, first_name, last_name, age, gender_id)
       VALUES ?`,
      [values]
    );
  },

  async findByBooking(booking_id: number) {
    const [rows] = await dbApi.query<RowDataPacket[]>(
      `SELECT p.*, g.code AS gender 
       FROM passengers p
       JOIN genders g ON p.gender_id = g.id
       WHERE p.booking_id = ?`,
      [booking_id]
    );
    return rows;
  },
};
