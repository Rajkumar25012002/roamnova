import React, { useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserDetailsById,
  getUserStatus,
} from "../../features/userSlice";
import { getCarListByOwnerId, getCarStatus } from "../../features/carSlice";
import formatDate from "../../utils/functions/formatDate";
import calculateRatingPercentage from "../../utils/functions/calculateRatings";
import ReviewCarsSkeleton from "./Skeletons/ReviewCarsSkeleton";
function RatingBar({ totalRatings, starCount }) {
  const percentage = (starCount / totalRatings) * 100;
  return (
    <div className="rating-bar">
      <div className="filled" style={{ width: `${percentage}%` }}></div>
      <div className="empty" style={{ width: `${100 - percentage}%` }}></div>
    </div>
  );
}
const Reviews = () => {
  const carStatus = useSelector(getCarStatus);
  const userStatus = useSelector(getUserStatus);
  const currentUserId = useSelector(getCurrentUser).userId;
  const currentUserCars = useSelector((state) =>
    getCarListByOwnerId(state, currentUserId)
  );
  const [selectedCar, setSelectedCar] = useState(
    currentUserCars[0]?.carId || null
  );
  const ReviewData = () => {
    const carDetails = currentUserCars.find((car) => car.carId === selectedCar);
    const averageReview = carDetails?.carReviews
      ? carDetails?.carReviews.reduce((a, c) => a + c.ratings, 0) /
        carDetails?.carReviews.length
      : 0;
    const carReviews = carDetails?.carReviews;
    const carRatings = carDetails?.carReviews.map((value) => {
      return value.ratings;
    });
    return (
      <div className="data">
        <div className="review-container">
          <span>
            <p>{averageReview || 0}</p>
            <AiFillStar></AiFillStar>
            <p>Overall Rating</p>
          </span>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((value, index) => {
              return (
                <div key={index} className="single-line">
                  <p>{`${value} stars`}</p>
                  <RatingBar
                    totalRatings={100}
                    starCount={calculateRatingPercentage(carRatings, value)}
                  />
                  <p>{calculateRatingPercentage(carRatings, value)}%</p>
                </div>
              );
            })}
          </div>
        </div>
        {carDetails?.carReviews.length > 0 && (
          <div className="review-comments">
            <div className="comment-container">
              {carReviews.map((value, index) => {
                return (
                  <div key={index} className="comment-box">
                    <div className="comments">
                      {[1, 2, 3, 4, 5].map((star, index) => {
                        return (
                          <AiFillStar
                            key={index}
                            className={`star ${
                              star <= value.ratings ? "selected" : ""
                            }`}
                          ></AiFillStar>
                        );
                      })}
                    </div>
                    <p className="name">
                      {
                        useSelector((state) =>
                          getUserDetailsById(state, value.userId)
                        ).fullName
                      }
                    </p>
                    <p className="comment">{value.comments}</p>
                    <p className="date">{formatDate(value.reviewedOn)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <Container>
      <h2>Reviews for cars</h2>
      {carStatus !== "pending" &&
      userStatus !== "pending" &&
      currentUserCars.length > 0 ? (
        <div className="review-main">
          <div className="car-list">
            {carStatus === "pending" || userStatus === "pending" ? (
              <ReviewCarsSkeleton value={5} />
            ) : (
              currentUserCars.map((car) => {
                return (
                  <div
                    key={car.carId}
                    onClick={() => setSelectedCar(car.carId)}
                    className={`car-card ${
                      selectedCar === car.carId ? "selected" : ""
                    }`}
                  >
                    <img src={car?.carPhotos[0]}></img>
                    <span className="details">
                      <p>{car?.carName}</p>
                      <p>{car?.carNumber}</p>
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <ReviewData />
        </div>
      ) : (
        <div className="no-review">You don&apos;t have any car to review</div>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 2rem;
  .no-review{
    text-align: center;
  }
  .review-main {
    display: flex;
    gap: 1rem;
    .car-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.25rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 0.5rem;
        }
      }
      height: 25rem;
      .selected {
        background-color: #d5d5d5;
      }
      .car-card {
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        transition: 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          background-color: #d5d5d5;
        }
        & > img {
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          border-radius: 0.25rem;
        }
        .details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
      }
    }
    .data {
      flex: 0.8;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      gap: 0.5rem;
      height: 25rem;
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.25rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 0.5rem;
        }
      }
      .review-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 20rem;
        span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          svg {
            color: orange;
          }
        }
        .review-stars {
          display: flex;
          flex-direction: column;
          .single-line {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            .rating-bar {
              width: 70%;
              display: flex;
              height: 8px;
              background-color: #ddd;
              border-radius: 10px;
              overflow: hidden;
              .filled {
                background-color: #ff8c38;
              }
              .empty {
                background-color: #b9b9b9;
              }
            }
          }
        }
      }
      .review-comments {
        display: flex;
        flex-direction: column;
        .comment-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          .comment-box {
            display: flex;
            width: 15rem;
            flex-direction: column;
            padding: 0.5rem;
            border-radius: 0.3rem;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
            .comments {
              display: flex;
              gap: 0.25rem;
            }
            svg {
              color: #707070;
            }
            .selected {
              color: orange;
            }
            .name {
              font-weight: 600;
            }
            .date {
              color: #8c8c8c;
              font-size: small;
            }
            p {
              text-align: justify;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 785px) {
    .review-main {
      flex-direction: column;
    }
  }
`;
export default Reviews;
