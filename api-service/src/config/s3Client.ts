import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
import logger from "./logger.js";
import { ApiError } from "../utils/apiError.js";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const s3 = new AWS.S3();

export const uploadToS3 = async (file: Express.Multer.File, folder: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `${folder}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const data = await s3.upload(params).promise();
  return data.Location; // public URL
};

export const deleteFromS3 = async (fileUrl: string) => {
  try {
    const bucket = process.env.S3_BUCKET_NAME!;
    // Extract key from full S3 URL
    const key = fileUrl.split(`${bucket}/`)[1] || fileUrl.split(".amazonaws.com/")[1];

    if (!key) {
      console.warn("⚠️ Could not extract S3 key from URL:", fileUrl);
      return;
    }

    const params = {
      Bucket: bucket,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    logger.info(`🗑️ Deleted file from S3: ${key}`);
  
  } catch (error) {
    logger.error(error);
    throw new ApiError(500, "Failed to delete file from S3");
  }
};