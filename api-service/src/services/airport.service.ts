import { AirportModel } from "../models/airport.model.js";
import { Airport } from "../types/airport.types.js";
import { ApiError } from "../utils/apiError.js";

export const AirportService = {
  async createAirport(data: Airport): Promise<Airport> {
    if (!data.code || !data.name) {
      throw new ApiError(400, "Code and Name are required");
    }

    // Check if airport already exists
    const existing = await AirportModel.findByCode(data.code);
    if (existing) throw new ApiError(400, "Airport already exists");

    return await AirportModel.create(data);
  },

  async getAllAirports(): Promise<Airport[]> {
    return await AirportModel.getAll();
  },

  async deleteAirport(id: number | string): Promise<Airport> {
    const airport = await AirportModel.findById(id);
    if (!airport) throw new ApiError(404, "Airport not found");
    const deletedAirport = await AirportModel.delete(id);
    return deletedAirport;
  },
};
