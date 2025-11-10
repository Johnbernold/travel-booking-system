import jwt from "jsonwebtoken";
import { User } from "../types/auth.types.js";

let JWT_REFRESH_SECRET  = process.env.JWT_SECRET || "default_secret";
let JWT_SECRET = process.env.JWT_SECRET || "default_secret";


interface JwtPayload {
  id: number;
  email: string;
  name?: string;
}

export const generateAccessToken = (user: User) => {

    console.log("user", typeof user.id);
       
    if (!user.id) {
        throw new Error("User ID is missing");
    }

    const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    
    const JWT_EXPIRES_IN = "1h";

    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const generateRefreshToken = (user: User) => {
    if (!user.id) {
        throw new Error("User ID is missing");
    }

    const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    
    const JWT_EXPIRES_IN = "7d";

    return jwt.sign(payload, JWT_REFRESH_SECRET  as string, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, JWT_SECRET as string);
};

export const verifyRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET  as string);
};