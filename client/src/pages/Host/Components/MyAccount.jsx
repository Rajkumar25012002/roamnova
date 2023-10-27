import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionSuccess,
  toastOptionError,
} from "../../../utils/functions/toastOptions";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  getUserError,
  getUserStatus,
} from "../../../features/userSlice";

const MyAccount = () => {
  const dispatch = useDispatch();
  const { userDetails } = useOutletContext();
  const userError = useSelector(getUserError);
  const userStatus = useSelector(getUserStatus);
  const [userData, setUserData] = useState(userDetails);
  const [userUpdateRequest, setUserUpdateRequest] = useState("idle");
  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userUpdateRequest === "idle") {
      try {
        setUserUpdateRequest("pending");
        dispatch(
          updateUser({
            userData: userData,
          })
        );
        if (userStatus === "fulfilled") {
          toast.success("User updated successfully", toastOptionSuccess);
        } else {
          toast.error(userError, toastOptionError);
        }
      } catch (err) {
        console.log("Failed to  update user", err);
      } finally {
        setUserUpdateRequest("idle");
      }
    }
  };
  return (
    <AccountContainer>
      <div className="my-account">
        <h3>MY ACCOUNT</h3>
        <div className="account-details">
          <h4>Account Details</h4>
          <div className="line"></div>
          <div className="inputs">
            <label className="email">
              <p>Email</p>
              <input
                type="text"
                name="email"
                value={userData?.email}
                onChange={handleChange}
              />
            </label>
            <label className="mobile">
              <p>Mobile</p>
              <input
                type="text"
                name="phoneNumber"
                value={userData?.phoneNumber}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="personal-details">
          <h4>Personal Details</h4>
          <div className="line"></div>
          <div className="inputs">
            <label className="fullName">
              <p>Full Name</p>
              <input
                type="text"
                name="fullName"
                value={userData?.fullName}
                onChange={handleChange}
              />
            </label>
            <label className="gender">
              <p>Gender</p>
              <input
                type="text"
                name="gender"
                value={userData?.gender}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="location-details">
          <h4>Location Details</h4>
          <div className="line"></div>
          <p>Please share your current location for better experience</p>
          <label className="location">
            <p>Location</p>
            <input
              type="text"
              name="city"
              value={userData?.city}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="primary-button" onClick={handleSubmit}>
          Update
        </button>
        <ToastContainer />
      </div>
    </AccountContainer>
  );
};
const AccountContainer = styled.div`
  .my-account {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > h3 {
      align-self: center;
    }
    .line {
      height: 1px;
      padding: 0 0.5rem;
      background-color: #e2e1e1;
    }
    .account-details,
    .personal-details {
      padding: 0.5;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .inputs {
        display: flex;
        gap: 1rem;
        & > label {
          display: flex;
          align-items: center;
          width: 16rem;
          justify-content: space-between;
        }
      }
    }
    .location-details {
      padding: 0.5;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      & > label {
        display: flex;
        align-items: center;
        width: 16rem;
        justify-content: space-between;
      }
    }
  }
`;
export default MyAccount;
