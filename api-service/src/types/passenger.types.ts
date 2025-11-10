
import { RowDataPacket } from "mysql2";

export interface Passenger extends RowDataPacket {
  id: number;
  booking_id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender_id: number;
}