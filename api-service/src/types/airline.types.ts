import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Airline extends RowDataPacket {
  id?: number;
  code: string;
  name: string;
  country?: string;
  logo_url?: string;
  created_at?: Date;
}

export interface AirlineData {
  id?: number;
  code: string;
  name: string;
  country?: string;
  logo_url?: string;
  created_at?: Date;
}