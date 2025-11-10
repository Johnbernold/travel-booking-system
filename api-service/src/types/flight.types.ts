import { RowDataPacket } from "mysql2";

export interface Flight  extends RowDataPacket {
  id?: number;
  airline_id: number;
  airplane_id: number;
  flight_number: string;
  from_airport_id: number;
  to_airport_id: number;
  departure_time: Date;
  arrival_time: Date;
  duration_minutes: number;
  price: number;
  available_seats: number;
}

export interface FlightModel {
  id?: number;
  flight_number: string;
  airline_id: number;
  airplane_id: number;
  from_airport_id: number;
  to_airport_id: number;
  departure_time: Date;
  arrival_time: Date;
  duration_minutes: number;
  price: number;
  available_seats: number;
  created_at?: Date;
  updated_at?: Date;
}