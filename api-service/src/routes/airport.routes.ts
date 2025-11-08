import { Express } from "express";
import { Router } from "express";
import { createAirportController, getAllAirportsController, deleteAirportController } from "../controllers/airport.controller.js";

const router = Router();

/**
 * @swagger
 * /api/airport:
 *  post:
 *    summary: Create a new airport
 *    tags:
 *      - airport
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                description: Code of the airport
 *                example: LHR
 *                required: true
 *              name:
 *                type: string
 *                description: Name of the airport
 *                example: London Heathrow
 *                required: true
 *              city:
 *                type: string
 *                description: City of the airport
 *                example: London
 *                required: false
 *              country:
 *                type: string
 *                description: Country of the airport
 *                example: United Kingdom
 *                required: false
 *    responses:
 *      201:
 *        description: Airport created successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error    
 */
router.post("/", createAirportController);

/**
 * @swagger
 * /api/airport:
 *  get:
 *    summary: Get all airports
 *    tags:
 *      - airport
 *    responses:
 *      200:
 *        description: Airports fetched successfully        
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllAirportsController);

/**
 * @swagger
 * /api/airport/{id}:
 *  delete:
 *    summary: Delete an airport
 *    tags:
 *      - airport
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the airport to delete
 *    responses:
 *      200:
 *        description: Airport deleted successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error    
 */
router.delete("/:id", deleteAirportController);

export default router;