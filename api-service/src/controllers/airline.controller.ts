import { Request, Response } from "express";
import { AirlineService } from "../services/airline.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createAirlineController = async (req: Request, res: Response) => {
  try {

    const { code, name, country, logo_url } = req.body;

    if (!code || !name || !country) {
      res.status(400).json(ApiResponse.error("Please provide all the required fields"));
      return;
    }
    
    const data = await AirlineService.createAirline(req.body, req.file);
    res.status(201).json(ApiResponse.success(data, "Airline created successfully"));
  } catch (err: any) {
    res.status(500).json(ApiResponse.error("Failed to create airline", err.message));
  }
};

export const getAllAirlinesController = async (req: Request, res: Response) => {
  const data = await AirlineService.getAllAirlines();
  res.json(ApiResponse.success(data, "All airlines fetched successfully"));
};

export const getAirlineByIdController = async (req: Request, res: Response) => {
  const airline = await AirlineService.getAirlineById(Number(req.params.id));
  if (!airline) return res.status(404).json(ApiResponse.error("Airline not found"));
  res.json(ApiResponse.success(airline));
};

export const deleteAirlineController = async (req: Request, res: Response) => {
  const success = await AirlineService.deleteAirline(Number(req.params.id));
  if (!success) return res.status(404).json(ApiResponse.error("Airline not found"));
  res.json(ApiResponse.success(null, "Airline deleted successfully"));
};
