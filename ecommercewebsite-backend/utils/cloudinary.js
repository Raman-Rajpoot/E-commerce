import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from './ApiError.js';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto'
    });
    console.log("File uploaded on Cloudinary:", response.url);

    if (!response) throw new ApiError(400, 'File not found');

    // Remove local file after uploading
    fs.unlinkSync(filePath);
    console.log("Local file removed:", filePath);

    return response;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);

    // Remove local file if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Local file removed:", filePath);
    }

    throw new Error("Failed to upload file to Cloudinary");
  }
};

export { uploadOnCloudinary };