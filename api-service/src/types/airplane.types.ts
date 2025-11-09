import {RowDataPacket} from "mysql2";

export interface AirplaneModel {
  id: number;
  model: string;
  capacity: number;
  airline_id: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Airplane extends RowDataPacket {
  id: number;
  model: string;
  capacity: number;
  airline_id: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}