import {Review} from '../models/review.model.js';
import { User } from '../models/user.model.js';

export const createReview = async (req, res) => {
  try {
   
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const { productId } = req.params;
   
    if (productId<0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product. You can edit you`r Review " });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    await review.save();

    res.status(201).json({
      message: "Review created successfully",
      savedReview: { review, userName: user.fullName },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review", error: error.message });
  }
};


// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
   

    const reviews = await Review.find({ product: productId })
  .populate('user', 'fullName') 
  .sort({ createdAt: -1 });

 
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
 
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const review = await Review.findOne({ _id: reviewId, user: userId });
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
  
    const { reviewId } = req.body;
    const userId = req.user._id;
    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
    console.log(revi)
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
