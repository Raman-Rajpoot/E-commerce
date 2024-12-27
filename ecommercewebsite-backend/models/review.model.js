import mongoose, {Schema} from "mongoose";
// import jwt from JsonWebTokenError
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"


const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a User model
      ref: 'User',
      required: true,
    },
    product: {
      type : Number,
      required : true
    },
    rating: {
      type: Number, // Rating for the product
      required: true,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
    comment: {
      type: String, // User's review comment
      maxlength: 500,
    },
    createdAt: {
      type: Date, // Review creation date
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Review = mongoose.model('Review', reviewSchema);
