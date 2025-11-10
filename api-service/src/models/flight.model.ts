import  dbApi  from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Flight } from "../types/flight.types.js";
import { ApiError } from "../utils/apiError.js";

export const FlightModel = {
  async create(flightData: Omit<Flight, "id">): Promise<Flight> {
    const [result] = await dbApi.query<ResultSetHeader>(
      `INSERT INTO flights 
      (flight_number, airline_id, airplane_id, from_airport_id, to_airport_id, 
      departure_time, arrival_time, duration_minutes, price, available_seats)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        flightData.flight_number,
        flightData.airline_id,
        flightData.airplane_id,
        flightData.from_airport_id,
        flightData.to_airport_id,
        flightData.departure_time,
        flightData.arrival_time,
        flightData.duration_minutes,
        flightData.price,
        flightData.available_seats,
      ]
    );

    const [rows] = await dbApi.query<Flight[]>(
      "SELECT * FROM flights WHERE id = ?",
      [result.insertId]
    );

    return rows[0];
  },

  async findAll(): Promise<Flight[]> {
    const [rows] = await dbApi.query<Flight[]>(`
      SELECT f.*, a.name AS airline_name, a.logo_url AS airline_logo_url, ap.model AS airplane_model, ap.capacity AS airplane_capacity, ap.image_url AS airplane_image_url,
             fromA.city AS from_city, toA.city AS to_city
      FROM flights f
      JOIN airlines a ON f.airline_id = a.id
      JOIN airplanes ap ON f.airplane_id = ap.id
      JOIN airports fromA ON f.from_airport_id = fromA.id
      JOIN airports toA ON f.to_airport_id = toA.id
      ORDER BY f.departure_time ASC
    `);
    return rows;
  },
  
 async findByRoute(
    from_airport_id: number,
    to_airport_id: number,
    date: string
  ): Promise<Flight[]> {
    const [rows] = await dbApi.query<Flight[]>(
      `
      SELECT 
        f.*,
        al.name AS airline_name,
        al.logo_url AS airline_logo_url,
        ap.model AS airplane_model,
        ap.capacity AS airplane_capacity,
        ap.image_url AS airplane_image_url,
        fa.name AS from_airport_name,
        fa.code AS from_airport_code,
        ta.name AS to_airport_name,
        ta.code AS to_airport_code
      FROM flights f
      JOIN airlines al ON f.airline_id = al.id
      JOIN airplanes ap ON f.airplane_id = ap.id
      JOIN airports fa ON f.from_airport_id = fa.id
      JOIN airports ta ON f.to_airport_id = ta.id
      WHERE f.from_airport_id = ?
        AND f.to_airport_id = ?
        AND DATE(f.departure_time) = ?
      ORDER BY f.departure_time ASC
      `,
      [from_airport_id, to_airport_id, date]
    );

    return rows;
  },

  async deleteById(id: number): Promise<void> {
    const [result] = await dbApi.query<ResultSetHeader>(
      "DELETE FROM flights WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) throw new ApiError(404, "Flight not found");
  },

  async findById(id: number) {
    const [rows] = await dbApi.query<Flight[]>(
      "SELECT * FROM flights WHERE id = ?",
      [id]
    );
    return rows[0];
  },
};
