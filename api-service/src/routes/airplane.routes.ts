import express from "express";
import multer from "multer";
import {
  createAirplaneController,
  getAllAirplanesController,
  deleteAirplaneController,
} from "../controllers/airplane.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/airplanes:
 *   post:
 *     summary: Create a new airplane
 *     tags: [airplanes]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 example: Boeing 737 MAX
 *               capacity:
 *                 type: number
 *                 example: 180
 *               airline_id:
 *                 type: number
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Airplane created successfully
 *       400:    
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", upload.single("image"), createAirplaneController);

/**
 * @swagger
 * /api/airplanes:
 *   get:
 *     summary: Get all airplanes
 *     tags: [airplanes]
 *     responses:
 *       200:
 *         description: List of airplanes
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllAirplanesController);

/**
 * @swagger
 * /api/airplanes/{id}:
 *   delete:
 *     summary: Delete an airplane
 *     tags: [airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Airplane ID
 *     responses:
 *       200:
 *         description: Airplane deleted successfully
 *       404:
 *         description: Airplane not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteAirplaneController);

export default router;
