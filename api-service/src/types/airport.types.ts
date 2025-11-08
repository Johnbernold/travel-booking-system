import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Airports extends RowDataPacket {
  id?: number;
  code: string;
  name: string;
  city?: string;
  country?: string;
  created_at?: Date;
}


export interface Airport {
  id?: number;
  code: string;
  name: string;
  city?: string;
  country?: string;
  created_at?: Date;
}
