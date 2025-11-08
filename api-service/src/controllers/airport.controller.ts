import { Request, Response, NextFunction } from "express";
import { AirportService } from "../services/airport.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Airport } from "../types/airport.types.js";

export const createAirportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const airport = await AirportService.createAirport(req.body as Airport);
    res.status(201).json(ApiResponse.success(airport, "Airport created successfully"));
  } catch (error) {
    next(error);
  }
};

export const getAllAirportsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const airports = await AirportService.getAllAirports();
    res.status(200).json(ApiResponse.success(airports, "Airports fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteAirportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: number | string };
    const airport = await AirportService.deleteAirport(id);
    res.status(200).json(ApiResponse.success(airport, "Airport deleted successfully"));
  } catch (error) {
    next(error);
  }
};