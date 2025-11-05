import express from "express";
import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

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

export default router;