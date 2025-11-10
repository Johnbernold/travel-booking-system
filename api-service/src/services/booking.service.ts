import { BookingModel } from "../models/booking.model.js";
import { PassengerModel } from "../models/passenger.model.js";
import { BookingStatusModel } from "../models/bookingStatus.model.js";
import { FlightModel } from "../models/flight.model.js";
import { v4 as uuidv4 } from "uuid";
import { CreateBookingInput, CreateBookingDTO , Booking } from "../types/booking.types.js";
import {ApiError} from "../utils/apiError.js";

export const BookingService = {
  async createBookingWithPassengers(data: CreateBookingInput){
    const { user_id, flight_id, passengers } = data;

    // Get status_id for PENDING
    const status = await BookingStatusModel.findByCode("PENDING");
    if (!status) throw new Error("Booking status PENDING not found");
    
      // ✅ Fetch flight details
    const flight = await FlightModel.findById(flight_id);
    if (!flight) {
      throw new ApiError(404, "Flight not found");
    }

    const total_amount = Number(flight.price) * passengers.length;


    const bookingRef = "BK-" + new Date().getFullYear() + "-" + uuidv4().slice(0, 6).toUpperCase();

    const booking = await BookingModel.create({
      booking_reference: bookingRef,
      flight_id: flight_id,
      user_id: user_id,
      total_amount: total_amount,
      status_id: status.id,
    });

    const passengerRecords = passengers.map((p) => ({
      ...p,
      booking_id: booking.id,
    }));

    await PassengerModel.createMany(passengerRecords);

    return {
      ...booking,
      passengers: passengerRecords,
    };
  },

  async getBookingDetails(id: number) {
    const booking = await BookingModel.findById(id);
    if (!booking) throw new Error("Booking not found");

    const passengers = await PassengerModel.findByBooking(id);
    return { ...booking, passengers };
  },

};
