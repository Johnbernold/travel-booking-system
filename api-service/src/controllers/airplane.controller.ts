import { Request, Response, NextFunction } from "express";
import { AirplaneService } from "../services/airplane.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createAirplaneController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { model, capacity, airline_id } = req.body;
    if (!model || !capacity || !airline_id) {
      res.status(400).json(ApiResponse.error("All fields are required"));
      return;
    }

    const airplane = await AirplaneService.createAirplane(req.file, {
      model,
      capacity: Number(capacity),
      airline_id: Number(airline_id),
    });

    res.status(201).json(ApiResponse.success(airplane, "Airplane created successfully"));
  } catch (err) {
    next(err);
  }
};

export const getAllAirplanesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    res.status(200).json(ApiResponse.success(airplanes, "Airplanes fetched successfully"));
  } catch (err) {
    next(err);
  }
};

export const deleteAirplaneController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await AirplaneService.deleteAirplane(id);
    res.status(200).json(ApiResponse.success(result, "Airplane deleted successfully"));
  } catch (err) {
    next(err);
  }
};
