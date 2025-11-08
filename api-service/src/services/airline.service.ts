import { AirlineModel } from "../models/airline.models.js";
import { Airline } from "../types/airline.types.js";
import { uploadToS3 } from "../config/s3Client.js";
import { ApiError } from "../utils/apiError.js";

export const AirlineService = {
  async createAirline(data: Airline, file?: Express.Multer.File) {
    let logo_url = data.logo_url;

    console.log("data",data);

    if (file) {
      logo_url = await uploadToS3(file, "airlines");
    } else {
        throw new ApiError(400, "logo is required");
    }

    const newAirline = {
      ...data,
      logo_url,
    };

    return await AirlineModel.create(newAirline);
  },

  async getAllAirlines() {
    return await AirlineModel.getAll();
  },

  async getAirlineById(id: number) {
    return await AirlineModel.getById(id);
  },

  async deleteAirline(id: number) {
    return await AirlineModel.deleteById(id);
  },
};
