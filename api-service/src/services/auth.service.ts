import { RegisterRequestBody, LoginRequestBody, VerifyOtpRequestBody } from "../types/auth.types.js";
import { Request, Response } from "express";
import { User, Newuser } from "../types/auth.types.js";
import bcrypt from "bcrypt";
import { generateOtp } from "../utils/generateOtp.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import sendEmailJobQueue from "../queues/jobs/sendEmailJob.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";

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

        await sendEmailJobQueue({
            type: "otp",
            to: email,
            subject: "OTP for Travel Booking System",
            payload: {
                name,
                otp
            },
        });

        return newUser;
    },

    async verifyOTPService(VerifyOtpRequestBody: VerifyOtpRequestBody) {
        const { email, otp } = VerifyOtpRequestBody;
        const isValid = await UserModel.verifyOTPFromDB(email, otp);
        return isValid;
    },

    async resendOTP(email: string) {

        if (!email) {
            throw new ApiError(400, "Email is required");
        }

        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes expiry

        const user = await UserModel.resendOtpDB(email, otp, otpExpiry);

        await sendEmailJobQueue({
            type: "otp",
            to: email,
            subject: "Resend OTP - Travel Booking System",
            payload: {
                name: user.name,
                otp
            },
        });

        return user;
    },

    async loginUserService(LoginRequestBody: LoginRequestBody) {
        const { email, password } = LoginRequestBody;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const user = await UserModel.findByEmail(email);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (!user.is_verified) {
            throw new ApiError(403, "Please verify your email before logging in");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new ApiError(401, "Invalid credentials");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    },

    async refreshTokenService(refreshToken: string) {

            const decoded = verifyRefreshToken(refreshToken) as User;

            const checkValue = await UserModel.findByEmail(decoded.email);
            if (!checkValue) {
                throw new ApiError(  404, "User not found");
            }
        
            return {
                accessToken: generateAccessToken(decoded),
            };
     
    }

}