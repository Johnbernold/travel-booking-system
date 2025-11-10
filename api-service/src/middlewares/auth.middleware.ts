import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env var in production

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name?: string;
    role?: string;
  };
}

interface JwtPayload {
  id: number | string;
  email: string;
  name?: string;
  role?: string;
}

export const authenticateJWT = (req: AuthRequest , res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(ApiResponse.error("Authorization token missing", 401));
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;


    const userId = Number(decoded.id);

    
    if (isNaN(userId)) {
      return res.status(401).json(ApiResponse.error("Invalid token payload", 401));
    }

    // Attach user info to request
    req.user = { ...decoded, id: userId };

    console.log("user_id middleware", req.user);

    next();
  } catch (error: any) {
    return res.status(401).json(ApiResponse.error("Invalid or expired token", 401));
  }
};
