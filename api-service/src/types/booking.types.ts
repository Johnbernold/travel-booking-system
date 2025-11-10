import { RowDataPacket } from "mysql2";

export interface PassengerInput {
  first_name: string;
  last_name: string;
  age: number;
  gender_id: number;
}

export interface CreateBookingInput {
  user_id: number;
  flight_id: number;
  total_amount?: number;
  passengers: PassengerInput[];
}

export interface Booking extends RowDataPacket {
  id?: number;
  booking_reference: string;
  flight_id: number;
  user_id: number;
  total_amount: number;
  status_id: number;
  created_at?: Date;
  updated_at?: Date;
}

// 👇 This one is for inserts (used in BookingModel.create)
export interface CreateBookingDTO {
  booking_reference: string;
  flight_id: number;
  user_id: number;
  total_amount: number;
  status_id: number;
}
