import { Router } from "express";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management and passenger handling
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking with multiple passengers
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - flight_id
 *               - passengers
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user making the booking
 *                 example: 1
 *               flight_id:
 *                 type: integer
 *                 description: ID of the flight being booked
 *                 example: 10
 *               passengers:
 *                 type: array
 *                 description: List of passengers included in the booking
 *                 items:
 *                   type: object
 *                   required:
 *                     - first_name
 *                     - last_name
 *                     - age
 *                     - gender_id
 *                   properties:
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     gender_id:
 *                       type: integer
 *                       example: 1
 *           example:
 *             user_id: 1
 *             flight_id: 3
 *             passengers:
 *               - first_name: John
 *                 last_name: Doe
 *                 age: 29
 *                 gender_id: 1
 *               - first_name: Jane
 *                 last_name: Doe
 *                 age: 26
 *                 gender_id: 2
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid request or missing parameters
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateJWT, BookingController.createBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details fetched
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error        
 */
router.get("/:id", authenticateJWT, BookingController.getBooking);


export default router;
