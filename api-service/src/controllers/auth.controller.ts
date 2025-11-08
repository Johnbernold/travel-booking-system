import { RegisterRequestBody, LoginRequestBody, VerifyOtpRequestBody } from "../types/auth.types.js";
import { Request, Response , NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { AuthService } from "../services/auth.service.js";
import { refreshTokenOptions } from "../utils/refreshTokenOptions.js";

export const register = async (req: Request, res: Response, next: NextFunction ) => {
    const { name, email, password } = req.body as RegisterRequestBody;
    try {
        const user = await AuthService.register(name, email, password);
        res.status(200).json(ApiResponse.success(user, "User registered successfully"));
    } catch (err) {
        next(err);
    }

};

export const verifyOtpController = async (req: Request, res: Response, next: NextFunction ) => {
    const { email, otp } = req.body as VerifyOtpRequestBody;

    if (!email || !otp) {
        res.status(400).json(ApiResponse.error("Email and OTP are required"));
        return;
    }

    try {
        const isValid = await AuthService.verifyOTPService({email, otp});
        if (isValid) {
            res.status(200).json(ApiResponse.success(null, "OTP verified successfully"));
        } else {
            res.status(400).json(ApiResponse.error("Invalid OTP or OTP has expired"));
        }
    } catch (err) {
        next(err);
    }

};

export const resendOTPController = async (req: Request, res: Response, next: NextFunction ) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json(ApiResponse.error("Email is required"));
        return;
    }

    try {
        const user = await AuthService.resendOTP(email);
        if (!user) {
            res.status(400).json(ApiResponse.error("Email not found"));
            return;
        }
        res.status(200).json(ApiResponse.success(user, "OTP resent successfully"));

    } catch (err) {
        next(err);
    }

};

export const loginController = async (req: Request, res: Response, next: NextFunction ) => {
    const { email, password } = req.body as LoginRequestBody;

    if (!email || !password) {
        res.status(400).json(ApiResponse.error("Email and password are required"));
        return;
    }

    try {
        const userInfo = await AuthService.loginUserService({email, password});

        const accessToken = userInfo.accessToken;
        const refreshToken = userInfo.refreshToken;
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);

        const result = {
            accessToken,
            user: userInfo.user,
        };

        res.status(200).json(ApiResponse.success(result, "Login successful"));
    } catch (err) {
        next(err);
    }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction ) => {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    try{
         if (!refreshToken) {
        res.status(400).json(ApiResponse.error("Refresh token is not provided in cookies"));    
        return;
    }
        const result = await AuthService.refreshTokenService(refreshToken);
        res.status(200).json(ApiResponse.success(result, "New access token generated successfully"));
    } catch (err) {
        next(err);
    }
}

