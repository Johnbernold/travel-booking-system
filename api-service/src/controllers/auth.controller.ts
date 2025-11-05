import { RegisterRequestBody, LoginRequestBody } from "../types/auth.types.js";
import { Request, Response , NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { AuthService } from "../services/auth.service.js";

export const register = async (req: Request, res: Response, next: NextFunction ) => {
    const { name, email, password } = req.body as RegisterRequestBody;
    try {
        const user = await AuthService.register(name, email, password);
        res.status(200).json(ApiResponse.success(user, "User registered successfully"));
    } catch (err) {
        next(err);
    }

};