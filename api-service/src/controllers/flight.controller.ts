import { Request, Response, NextFunction } from "express";
import { FlightService } from "../services/flight.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createFlightController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flight = await FlightService.createFlight(req.body);
    res.status(201).json(ApiResponse.success(flight, "Flight created successfully"));
  } catch (err) {
    next(err);
  }
};

export const getAllFlightsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flights = await FlightService.getAllFlights();
    res.status(200).json(ApiResponse.success(flights, "All flights retrieved"));
  } catch (err) {
    next(err);
  }
};

export const searchFlightsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from_airport_id, to_airport_id, date } = req.query;
    const flights = await FlightService.searchFlights(
      Number(from_airport_id),
      Number(to_airport_id),
      String(date)
    );
    res.status(200).json(ApiResponse.success(flights, "Flights found"));
  } catch (err) {
    next(err);
  }
};

export const deleteFlightController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await FlightService.deleteFlight(Number(req.params.id));
    res.status(200).json(ApiResponse.success(null, "Flight deleted successfully"));
  } catch (err) {
    next(err);
  }
};
