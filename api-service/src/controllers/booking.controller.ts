import { Request, Response } from "express";
import { BookingService } from "../services/booking.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Booking } from "../types/booking.types.js";
import {AuthRequest} from "../middlewares/auth.middleware.js";

export const BookingController = {
  async createBooking(req: Request, res: Response) {
    try {
      const { flight_id, user_id, passengers } = req.body;

      if (!flight_id || !user_id  || !passengers?.length) {
        throw new ApiError(400, "All booking details and passengers are required");
      }

      const result = await BookingService.createBookingWithPassengers({
        flight_id,
        user_id,
        passengers,
      });

      res.status(201).json(ApiResponse.success(result,"Booking created successfully"));
    } catch (error: any) {
      res.status(error.statusCode || 500).json(ApiResponse.error(error.message));
    }
  },

  async getBooking(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await BookingService.getBookingDetails(id);
      res.status(200).json(ApiResponse.success(result,"Booking details fetched"));
    } catch (error: any) {
      res.status(error.statusCode || 500).json(ApiResponse.error(error.message));
    }
  },


};


