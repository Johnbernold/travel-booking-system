import express from "express";
import { Router } from "express";
import { register, verifyOtpController, resendOTPController, loginController } from "../controllers/auth.controller.js";
import { verify } from "crypto";

const router = Router();

router.get("/", (req, res) => {

  console.log("call router");

  res.send("Hello from auth routes");
});

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register a new user
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the user
 *                example: John Doe
 *                required: true
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: johndoe@example.com
 *                required: true
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: password123
 *                required: true
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.post("/register", register)

//user otp verification
/**
 * @swagger
 * /api/auth/verify-otp:
 *  post:
 *    summary: Verify OTP
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: johndoe@example.com
 *                required: true
 *              otp:
 *                type: string
 *                description: OTP of the user
 *                example: 0
 *                required: true
 *    responses:
 *      200:
 *        description: OTP verified successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error    
 */
router.post("/verify-otp", verifyOtpController)

/**
 * @swagger
 * /api/auth/resend-otp:
 *  post:
 *    summary: Resend OTP
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: johndoe@example.com
 *                required: true
 *    responses:
 *      200:
 *        description: OTP resent successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error    
 */
router.post("/resend-otp", resendOTPController)

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login a user
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: johndoe@example.com
 *                required: true
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: password123
 *                required: true
 *    responses:
 *      200:
 *        description: Login successful
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error    
 */
router.post("/login", loginController)

export default router;