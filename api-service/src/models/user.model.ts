import dbApi from "../config/db.js";
import {User, Newuser, OTPVerification} from "../types/auth.types.js";
import { ResultSetHeader } from "mysql2";
import { ApiError } from "../utils/apiError.js";

export const UserModel = {

    async findByEmail(email: string): Promise<User> {
        const [user] = await dbApi.query<User[]>("SELECT * FROM users WHERE email = ?", [email]);
        return user[0];
    },

    async create(user: Newuser): Promise<User> {
        const [newUser] = await dbApi.query<ResultSetHeader>("INSERT INTO users (name, email, password,otp, otp_expiry) VALUES (?, ?, ?, ?, ?)", [user.name, user.email, user.password, user.otp, user.otp_expiry]);
        const userInfo =  { name: user.name, email: user.email};
        return {id: newUser.insertId, ...userInfo} as User;
    },

    async verifyOTPFromDB(email: string, otp: string): Promise<boolean> {
       
        const connection = await dbApi.getConnection();

        try {
            const [rows] = await connection.query<OTPVerification[]>(
                "SELECT otp, otp_expiry FROM users WHERE email = ? AND otp = ? LIMIT 1",
                [email, otp]
            );

            if (rows.length === 0) {
                await connection.rollback();
                return false; // No matching OTP found
            }

            const record = rows[0];
            const now = new Date();
            const expiryTime = new Date(record.otp_expiry);

            if(now.getTime() > expiryTime.getTime()) {
                console.log("expired");
                await connection.rollback();
                return false; // OTP has expired
            }

            await connection.query("UPDATE users SET is_verified = ?, otp = NULL, otp_expiry = NULL WHERE email = ?", [true, email]);
            await connection.commit();
            return true; // OTP is valid

        } catch (err) {
            await connection.rollback();
            throw new ApiError(400, "Invalid OTP");
        } finally { 
            connection.release();
        }
    },  

    async resendOtpDB(email: string, otp: string, otpExpiry: Date): Promise<User> {

        const [updateResult] = await dbApi.query<ResultSetHeader>(
            "UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?",
            [otp, otpExpiry, email] 
        );

        if (updateResult.affectedRows === 0) {
            throw new ApiError(400, "Email not found");
        }

        const [rows] = await dbApi.query<User[]>(
            "SELECT id, email, name FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (!rows || rows.length === 0) {
            throw new ApiError(404, "User not found after update");
        }

        return rows[0];

    }
    



}