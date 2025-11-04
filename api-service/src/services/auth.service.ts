import { RegisterRequestBody, LoginRequestBody } from "../types/auth.types.js";
import { Request, Response  } from "express";
import { User, Newuser } from "../types/auth.types.js";
import bcrypt from "bcrypt";
import { generateOtp } from "../utils/generateOtp.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";


export const AuthService = {

    async register(name: string, email: string, password: string) { 

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes expiry

        const user: Newuser = {
            name,
            email,
            password: hashedPassword,
            otp,
            otp_expiry: otpExpiry,
        };

        const newUser = await UserModel.create(user);

        return newUser;
    },
    

}