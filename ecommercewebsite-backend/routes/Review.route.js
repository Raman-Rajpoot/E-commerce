import express from 'express';
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from '../controllers/review.controller.js';

import { verifyJwt } from '../middlewares/auth.middlewere.js';

const reviewRouter = express();

reviewRouter.post('/add/:productId', verifyJwt, createReview); // Create a review 
reviewRouter.get('/get/:productId', getProductReviews); // Get reviews for a product
reviewRouter.put('/update/:reviewId', verifyJwt, updateReview); // Update a review
reviewRouter.delete('/delete', verifyJwt, deleteReview); // Delete a review

export default reviewRouter;
