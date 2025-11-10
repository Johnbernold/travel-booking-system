import { FlightModel } from "../models/flight.model.js";
import { AirlineModel } from "../models/airline.models.js";
import { AirplaneModel } from "../models/airplane.model.js";
import { differenceInMinutes } from "date-fns";
import { Flight } from "../types/flight.types.js";
import  dbApi  from "../config/db";
import { ApiError } from "../utils/apiError.js";
import { RowDataPacket } from "mysql2";
import redisClient from "../config/redisClient.js";

export const FlightService = {
  async createFlight(data: Flight): Promise<Flight> {

    if(!data.airline_id || !data.airplane_id || !data.from_airport_id || !data.to_airport_id || !data.departure_time || !data.arrival_time || !data.price) {
      throw new ApiError(400, "All fields are required");   
    }

    if(data.from_airport_id === data.to_airport_id) {
      throw new ApiError(400, "From and to airports cannot be the same");
    }

    const airlines = await AirlineModel.getAll();
    const airline = airlines.find(a => a.id === data.airline_id);
    if (!airline) throw new Error("Invalid airline_id");

    const airplanes = await AirplaneModel.findAll();
    const airplane = airplanes.find(a => a.id === data.airplane_id);
    if (!airplane) throw new Error("Invalid airplane_id");

    // auto-calculate values
    const duration = differenceInMinutes(data.arrival_time, data.departure_time);
    const flightNumber = `${airline.code}-${Math.floor(Math.random() * 900 + 100)}`;
    const availableSeats = airplane.capacity;

    const newFlight: Omit<Flight, "id"> = {
      flight_number: flightNumber,
      airline_id: data.airline_id,
      airplane_id: data.airplane_id,
      from_airport_id: data.from_airport_id,
      to_airport_id: data.to_airport_id,
      departure_time: data.departure_time,
      arrival_time: data.arrival_time,
      duration_minutes: duration,
      price: data.price,
      available_seats: availableSeats,
    };

    return await FlightModel.create(newFlight);
  },

  async getAllFlights() {
    return await FlightModel.findAll();
  },

  async searchFlights(from_airport_id: number, to_airport_id: number, date: string) {

    if(!from_airport_id || !to_airport_id || !date) {
      throw new ApiError(400, "All fields are required");
    }

    if(from_airport_id === to_airport_id) {
      throw new ApiError(400, "From and to airports cannot be the same");
    }

    const cacheKey = `flights:${from_airport_id}:${to_airport_id}:${date}`;
    const cachedFlights = await redisClient.get(cacheKey);
    if (cachedFlights) {
      console.log("🚀 Using cached flights");
      return JSON.parse(cachedFlights);
    }

    const flights = await FlightModel.findByRoute(from_airport_id, to_airport_id, date);
    await redisClient.set(cacheKey, JSON.stringify(flights), "EX", 3600);

    return flights; 
    
  },

  async deleteFlight(id: number) {
    await FlightModel.deleteById(id);
  },
};
