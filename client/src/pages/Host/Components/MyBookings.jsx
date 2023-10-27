import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCarDetailsById } from "../../../features/carSlice";
import {
  getRentCarsByCustomerId,
  cancelBooking,
} from "../../../features/rentalCarSlice";
import ConfirmPopup from "../../User/Components/PopConfirm";
import ReviewCar from "../../User/Components/PopCarReview";
import formatDateTime from "../../../utils/functions/formatDateTime";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
const MyBookings = () => {
  const [popUp, setPopUp] = useState(false);
  const { userDetails } = useOutletContext();

  const bookedDetails = useSelector((state) =>
    getRentCarsByCustomerId(state, userDetails?.userId)
  );

  const handlePopUp = (e) => {
    e.preventDefault();
    setPopUp(!popUp);
  };
  const SingleCarBookDetails = ({ value }) => {
    const [showReview, setShowReview] = useState(false);
    const dispatch = useDispatch();
    const handleShowReview = () => {
      setShowReview(!showReview);
    };
    const handleCancellation = () => {
      dispatch(cancelBooking(value.rentalId));
      setPopUp(false);
    };
    const car = useSelector((state) =>
      getCarDetailsById(state, value.rentedCarId)
    );
    const isAlreadyreviewed = car?.carReviews.find(
      (review) => review.rentalId === value.rentalId
    );
    return (
      <div className="single-book">
        <div className="main-details">
          <div className="image-name">
            {car?.carPhotos === undefined && (
              <Skeleton
                width={"5rem"}
                height={"5rem"}
                borderRadius={"0.25rem"}
              />
            )}
            {car?.carPhotos && <img src={car?.carPhotos[0]}></img>}
            <span>
              <p className="name">{car?.carName}</p>
              <p className="number">{car?.carNumber}</p>
              <p className="total-amount">
                {Number(value.rentalAmount).toLocaleString("hi-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })}
              </p>
            </span>
          </div>
          <div className="status-date">
            <p className="status">{`${
              new Date(value.pickUpDate) > new Date()
                ? "Booked"
                : new Date(value.pickUpDate) < new Date() &&
                  new Date(value.dropDate) > new Date()
                ? "Active"
                : "Completed"
            }`}</p>
            <p className="booked-date">{`Picked up on ${formatDateTime(
              new Date(value.pickUpDate)
            )}`}</p>
            <p className="booked-date">{`Return on ${formatDateTime(
              new Date(value.dropDate)
            )}`}</p>
          </div>
        </div>
        <div className="details">
          <p className="booked-time">{`Booked on ${formatDateTime(
            new Date(value.rentedOn)
          )}`}</p>
          {new Date(value.dropDate) < new Date() && (
            <button
              className="positive-button"
              disabled={isAlreadyreviewed ? true : false}
              onClick={handleShowReview}
            >
              {`${isAlreadyreviewed ? "Reviewed" : "Add Review"}`}
            </button>
          )}
          {new Date(value.pickUpDate) > new Date() && (
            <button className="negative-button" onClick={handlePopUp}>
              Cancel Booking
            </button>
          )}
          {showReview && (
            <ReviewCar
              handleShowReview={handleShowReview}
              carId={value.rentedCarId}
              rentalId={value.rentalId}
            />
          )}
          {popUp && (
            <ConfirmPopup
              handlePopUp={handlePopUp}
              handleFunction={handleCancellation}
            />
          )}
        </div>
      </div>
    );
  };
  return (
    <BookingContainer>
      <div className="my-bookings">
        <h3>MY BOOKINGS</h3>
        <div className="book-list">
          {bookedDetails.map((value, index) => {
            return <SingleCarBookDetails key={index} value={value} />;
          })}
          {bookedDetails.length === 0 && (
            <p style={{ margin: "5rem", textAlign: "center" }}>
              No booked Cars
            </p>
          )}
        </div>
      </div>
    </BookingContainer>
  );
};
const BookingContainer = styled.div`
  .my-bookings {
    display: flex;
    flex-direction: column;
    & > h3 {
      align-self: center;
    }
    .book-list {
      display: flex;
      padding: 1rem;
      flex-direction: column;
      gap: 0.5rem;
      .single-book {
        display: flex;
        padding: 0.5rem;
        gap: 0.25rem;
        flex-direction: column;
        border: 1px solid #ababab;
        border-radius: 0.25rem;
      }
      .main-details {
        display: flex;
        justify-content: space-between;
        .image-name {
          display: flex;
          gap: 0.5rem;
          & > img {
            width: 5rem;
            height: 5rem;
            border-radius: 0.25rem;
          }
          span {
            display: flex;
            flex-direction: column;
            .name {
              font-size: 1.25rem;
              font-weight: 600;
            }
          }
        }
        .status-date {
          display: flex;
          gap: 0.5rem;
          flex-direction: column;
          & > p {
            text-align: end;
            font-size: small;
          }
          .status {
            padding: 0.25rem;
            border-radius: 0.25rem;
            width: max-content;
            font-size: medium;
            color: white;
            align-self: flex-end;
            background-color: #0a7205;
          }
        }
      }
      .details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: small;
          color: #717171;
        }
      }
    }
  }
`;
export default MyBookings;
