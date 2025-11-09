import { AirplaneModel } from "../models/airplane.model.js";
import { Airplane } from "../types/airplane.types.js";
import { uploadToS3, deleteFromS3 } from "../config/s3Client.js";
import { ApiError } from "../utils/apiError.js";

export const AirplaneService = {
  async createAirplane(file: Express.Multer.File | undefined, data: Omit<Airplane, "id">) {
    let image_url: string | undefined;
    if (file) {
      image_url = await uploadToS3(file, "airplanes");
    }

    const airplane = await AirplaneModel.create({ ...data, image_url });
    return airplane;
  },

  async getAllAirplanes() {
    return await AirplaneModel.findAll();
  },

  async deleteAirplane(id: number) {
    const airplane = await AirplaneModel.findById(id);
    if (!airplane) throw new ApiError(404, "Airplane not found");

    if (airplane.image_url) {
      await deleteFromS3(airplane.image_url);
    }

    const success = await AirplaneModel.deleteById(id);
    if (!success) throw new ApiError(500, "Failed to delete airplane");

    return { message: "Airplane deleted successfully" };
  },
};
