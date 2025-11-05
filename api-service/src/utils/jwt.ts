import jwt from "jsonwebtoken";
import { User } from "../types/auth.types.js";

export const generateAccessToken = (user: User) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const JWT_EXPIRES_IN = "1h";

    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const generateRefreshToken = (user: User) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    
    const JWT_REFRESH_SECRET  = process.env.JWT_SECRET || "default_secret";
    const JWT_EXPIRES_IN = "7d";

    return jwt.sign(payload, JWT_REFRESH_SECRET  as string, {
        expiresIn: JWT_EXPIRES_IN,
    });
};