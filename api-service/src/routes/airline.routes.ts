import { Router } from "express";
import multer from "multer";
import {
  createAirlineController,
  getAllAirlinesController,
  getAirlineByIdController,
  deleteAirlineController,
} from "../controllers/airline.controller.js";

const upload = multer({ storage: multer.memoryStorage() }); // store file in memory before upload
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: airlines
 *     description: Manage airline data
 */

/**
 * @swagger
 * /api/airlines/:
 *   post:
 *     summary: Create a new airline (uploads logo to S3)
 *     tags: [airlines]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - logo
 *             properties:
 *               code:
 *                 type: string
 *                 example: "AI"
 *               name:
 *                 type: string
 *                 example: "Air India"
 *               country:
 *                 type: string
 *                 example: "India"
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Airline created successfully
 */
router.post("/", upload.single("logo"), createAirlineController);

/**
 * @swagger
 * /api/airlines/:
 *   get:
 *     summary: Get all airlines
 *     tags: [airlines]
 *     responses:
 *       200:        
 *         description: Airlines fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllAirlinesController);

/**
 * @swagger
 * /api/airlines/{id}:
 *   get:
 *     summary: Get an airline by ID
 *     tags: [airlines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airline fetched successfully
 *       404:        
 *         description: Airline not found
 */
router.get("/:id", getAirlineByIdController);

/**
 * @swagger
 * /api/airlines/{id}:
 *   delete:
 *     summary: Delete an airline
 *     tags: [airlines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airline deleted successfully
 *       404:        
 *         description: Airline not found
 */
router.delete("/:id", deleteAirlineController);

export default router;
