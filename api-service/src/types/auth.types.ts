import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface RegisterRequestBody  {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface LoginRequestBody  {
    id: number;
    email: string;
    password: string;
}

export interface User extends RowDataPacket {
    id?: number;
    name: string;
    email: string;
    password: string;
    otp?: string;
    otp_expiry?: Date;
    is_verified?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Newuser {
    name: string;
    email: string;
    password: string;
    otp?: string;
    otp_expiry?: Date;
}
