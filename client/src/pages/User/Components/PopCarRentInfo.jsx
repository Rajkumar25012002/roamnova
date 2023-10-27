import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionSuccess,
  toastOptionError,
} from "../../../utils/functions/toastOptions";
import { AiOutlineClose } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../../App";
import formatDateTime from "../../../utils/functions/formatDateTime";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserDetailsById,
} from "../../../features/userSlice";
import {
  addRentCar,
  getRentCarStatus,
  getRentCarError,
} from "../../../features/rentalCarSlice";
import emailjs from "emailjs-com";

const RentCar = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useContext(SearchContext);
  const { handleToggle, ownerData, value, priceAfterDiscount, couponCode } =
    useOutletContext();
  const status = useSelector(getRentCarStatus);
  const error = useSelector(getRentCarError);
  const currentUser = useSelector(getCurrentUser);
  const userDetails = useSelector((state) =>
    getUserDetailsById(state, currentUser.userId)
  );
  const timeDifference = Math.abs(
    new Date(searchQuery.endDate) - new Date(searchQuery.startDate)
  );
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const handleAddRent = () => {
    try {
      dispatch(
        addRentCar({
          rentedCarId: value.carId,
          pickUpDate: searchQuery.startDate,
          dropDate: searchQuery.endDate,
          isDriver: searchQuery.isDriver,
          totalDays: daysDifference,
          rentalAmount: value.carRent * daysDifference,
          customerId: currentUser.userId,
          couponCode: couponCode,
        })
      );
      if (status === "fulfilled") {
        toast.success("Car rented successfully", toastOptionSuccess);
        handleToggle();
      } else {
        toast.error(error, toastOptionError);
      }
      const template = {
        user_name: userDetails.fullName,
        car_name: value.carName,
        car_model: value?.additionalInfo?.carModel,
        owner_name: ownerData.fullName,
        owner_email: ownerData.email,
        owner_phone: ownerData.phoneNumber,
        pickup_date: searchQuery.startDate,
        return_date: searchQuery.endDate,
        to_mail: userDetails.email,
      };
      emailjs.send(
        "service_hwtked1",
        "template_9x76v9k",
        template,
        "wdQ8CmjSao4bhUoN3"
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-btn" onClick={handleToggle} />
        <h1>Rent a car</h1>
        <div className="owner-info">
          <h3>Owner Info</h3>
          <p>Connect with owner if you have any queries</p>
          <label>
            Name :<p>{ownerData?.fullName}</p>
          </label>
          <label>
            Email :<p>{ownerData?.email}</p>
          </label>
          <label>
            Phone number :<p>{ownerData?.phoneNumber}</p>
          </label>
        </div>
        <div className="form-container">
          <label>
            <p>Pick-up DateTime :</p>
            <p>{formatDateTime(new Date(searchQuery?.startDate))}</p>
          </label>
          <label>
            <p>Drop-off DateTime :</p>
            <p>{formatDateTime(new Date(searchQuery?.endDate))}</p>
          </label>
          <label>
            <p>Need a driver?</p>
            <p>{searchQuery.isDriver ? "Yes" : "No"}</p>
          </label>
          <p>{`Rent:${value?.carRent}/day`}</p>
          <p>No.of.days : {daysDifference}</p>
          <p>{`Total Amount to be paid : ${priceAfterDiscount.toLocaleString(
            "hi-IN",
            {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            }
          )}`}</p>
          <p>By confirming this rent,the request will be sent to the owner</p>
          <button
            className="primary-button"
            onClick={handleAddRent}
            type="submit"
          >
            Confirm
          </button>
        </div>
        <ToastContainer />
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
  background-color: rgba(0, 0, 0, 0.5);
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
    height: max-content;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    h1 {
      align-self: center;
      color: rgb(40, 167, 69);
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .owner-info {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border: 1px solid #9e9d9d;
      border-radius: 0.5rem;
      & > label {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      & > label {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    }
  }
`;
export default RentCar;
