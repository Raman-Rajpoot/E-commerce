import {Review} from '../models/review.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';


// import mongoose from "mongoose";
// import Review from "../models/reviewModel"; // Ensure correct model import
// import User from "../models/userModel"; // Ensure correct model import
// import Product from "../models/productModel"; // Ensure correct model import

export const createReview = async (req, res) => {
  try {
    console.log("Start")
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const { productId } = req.params;
    console.log(rating,comment,userId, productId)
    // Validate productId
    if (productId<0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if the product exists
    // const productExists = await Product.findById(productId);
    // if (!productExists) {
    //   return res.status(404).json({ message: "Product not found" });
    // }

    // Check if the user has already reviewed this product
    console.log("mid")
    const existingReview = await Review.findOne({ user: userId, product: productId });
    console.log(existingReview)
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product. You can edit you`r Review " });
    }

    // Retrieve user details for name
    const user = await User.findById(userId);
    console.log(user.fullName)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save review
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });
  console.log(review)
    await review.save();

    res.status(201).json({
      message: "Review created successfully",
      savedReview: { review, userName: user.fullName },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review", error: error.message });
  }
  console.log('complete')
};


// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId)

    const reviews = await Review.find({ product: productId })
  .populate('user', 'fullName') // Fetch only the `username` field from the `User` model
  .sort({ createdAt: -1 });

 // Sort by newest reviews
      console.log(reviews)
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    console.log("start")
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;
    console.log(reviewId,rating,comment,userId)
    const review = await Review.findOne({ _id: reviewId, user: userId });
    console.log(review)
    const user = await User.findById(userId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you do not have permission to edit it' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
 
    await review.save();
    res.status(200).json({ message: 'Review updated successfully',  savedReview: { review, userName: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    console.log("Start")
    const { reviewId } = req.body;
    console.log(reviewId)
    const userId = req.user._id;
    console.log(userId)
    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
    // console.log(revi)
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
