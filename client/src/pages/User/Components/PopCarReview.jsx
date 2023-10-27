import React, { useState } from "react";
import styled from "styled-components";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../../utils/functions/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../../features/userSlice";
import { getCarErr, getCarStatus, addReview } from "../../../features/carSlice";

const ReviewCar = ({ handleShowReview, carId, rentalId }) => {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const [ratings, setRatings] = useState(0);
  const [comments, setComments] = useState("");
  const dispatch = useDispatch();
  const carStatus = useSelector(getCarStatus);
  const carErr = useSelector(getCarErr);
  const handleStarClick = (selectedRating) => {
    setRatings(selectedRating);
  };
  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };
  const handleAddReview = (e) => {
    e.preventDefault();
    if (comments && ratings) {
      
      dispatch(
        addReview({
          userId: currentUserId,
          comments,
          ratings,
          carId,
          rentalId,
        })
      );
      if (carStatus === "fulfilled") {
        toast.success("Review added successfully", toastOptionSuccess);
      } else {
        toast.error(carErr, toastOptionError);
      }
    }
    handleShowReview();
  };
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-bn" onClick={handleShowReview} />
        <div className="review-container">
          <h2>Write a Review</h2>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar
                key={star}
                className={`star ${star <= ratings ? "selected" : ""}`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <textarea
            className="comment"
            placeholder="Write your comment here..."
            value={comments}
            onChange={handleCommentChange}
          />
          <button className="primary-button" onClick={handleAddReview}>
            Submit Review
          </button>
          <ToastContainer />
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.223);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    width: 20rem;
    height: max-content;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    .close-bn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .review-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h2 {
        align-self: center;
        color: rgb(40, 167, 69);
      }
      .rating {
        svg {
          cursor: pointer;
          color: #8f8e8e;
        }
        .selected {
          color: orange;
        }
      }
      textarea {
        resize: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: none;
        outline: none;
        height: 5rem;
        border: 1px solid #8f8e8e;
      }
    }
  }
`;
export default ReviewCar;
