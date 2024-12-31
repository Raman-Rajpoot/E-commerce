import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import starIcon from "../images/star_icon.png";
import LoginContext from "../Context/Login_context/LoginContext";

function ReviewPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const Login_Context = useContext(LoginContext);

  useEffect(() => {
    if (!productId) {
      navigate("/not-found"); 
      return;
    }

    async function fetchReviews() {
      setErrorMessage("");
      try {
        const response = await fetch(`http://localhost:7000/api/v1/reviews/get/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedReviews = data.map(review => ({
            _id: review._id,
            comment: review.comment,
            rating: review.rating,
            userName: review.user.fullName,
            userId: review.user._id,
            date: new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }));
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setErrorMessage("Unable to load reviews. Please try again later.");
      } finally {
        setLoadingReviews(false);
      }
    }

    fetchReviews();
  }, [productId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Login_Context.user?.email) {
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      alert("Comment field cannot be empty!");
      return;
    }

    const reviewData = {
      rating: parseInt(rating, 10),
      comment: comment.trim(),
    };

    setIsLoading(true);

    try {
      const url = editReview
        ? `http://localhost:7000/api/v1/reviews/update/${editReview._id}`
        : `http://localhost:7000/api/v1/reviews/add/${productId}`;

      const method = editReview ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res?.message || "Failed to submit review");
        throw new Error(res?.message || "Failed to submit review");
      }

      const result = await response.json();
      const savedReview = {
        _id: result.savedReview.review._id,
        comment: result.savedReview.review.comment,
        rating: result.savedReview.review.rating,
        userName: result.savedReview.userName,
        userId: result.savedReview.userId,
        date: new Date(result.savedReview.review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };

      setReviews(prev =>
        editReview
          ? prev.map(review => (review._id === savedReview._id ? savedReview : review))
          : [savedReview, ...prev]
      );
      setRating(5);
      setComment("");
      setEditReview(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`http://localhost:7000/api/v1/reviews/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reviewId }),
        });

        if (!response.ok) throw new Error("Failed to delete review");

        setReviews(prev => prev.filter(review => review._id !== reviewId));
      } catch (error) {
        console.error("Error deleting review:", error);
        setErrorMessage("Failed to delete review. Please try again.");
      }
    }
  };

  const handleEdit = (review) => {
    setEditReview(review);
    setRating(review.rating);
    setComment(review.comment);
  };

  return (
    <div className="review-page">
      <h2 className="review-title">Customer Reviews</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>{editReview ? "Update Review" : "Write a Review"}</h3>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            rows="4"
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Submitting..." : editReview ? "Update Review" : "Submit Review"}
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {loadingReviews ? (
        <div className="loading-message">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews-message">No reviews yet. Be the first to leave one!</div>
      ) : (
        <ul className="review-list">
          {reviews.map(review => (
            <li key={review._id} className="review-item">
              <div className="review-header">
                <h4 className="review-user">{review.userName}</h4>
                <span className="review-rating">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <img src={starIcon} alt="star" key={i} className="star-icon" />
                  ))}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <p className="review-date">Reviewed on: {review.date}</p>
              {Login_Context.user?._id === review.userId && (
                <div className="review-actions">
                  <button className="edit-btn" onClick={() => handleEdit(review)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(review._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReviewPage;
