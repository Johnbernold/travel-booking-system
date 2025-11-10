import express from "express";
import {
    createFlightController,
    getAllFlightsController,
    searchFlightsController,
    deleteFlightController,
} from "../controllers/flight.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management
 */

/**
 * @swagger
 * /api/flights/:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               airline_id:
 *                 type: integer
 *               airplane_id:
 *                 type: integer
 *               from_airport_id:
 *                 type: integer
 *               to_airport_id:
 *                 type: integer
 *               departure_time:
 *                 type: string
 *                 format: date-time
 *               arrival_time:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Flight created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", createFlightController);

/**
 * @swagger
 * /api/flights/:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: All flights retrieved
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllFlightsController);

/**
 * @swagger
 * /api/flights/search:
 *   get:
 *     summary: Search flights by route and date
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: from_airport_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: to_airport_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           example: 2023-11-09
 *         required: true
 *     responses:
 *       200:
 *         description: Flights found
 *       500:
 *         description: Internal server error
 */
router.get("/search", searchFlightsController);

/**
 * @swagger
 * /api/flights/{id}:
 *   delete:
 *     summary: Delete a flight
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flight deleted
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteFlightController);

export default router;
