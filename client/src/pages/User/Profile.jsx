import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../utils/functions/toastOptions";
import { AiFillGift } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaBuyNLarge } from "react-icons/fa";
import { MdCreditScore, MdAccountBox } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUser,
  getUserDetailsById,
  updateProfilePic,
  getUserError,
  getUserStatus,
  removeCurrentUser,
} from "../../features/userSlice";
import { getRentCarsByCustomerId } from "../../features/rentalCarSlice";
import {
  addHostRequest,
  getAdminDataStatus,
  getAdminDataErr,
} from "../../features/adminSlice";
import ROLE from "../../data/Roles";
import logoutAPI from "../../utils/HandleAPI/LogoutAPI";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const currentUserRole = useSelector(getCurrentUser)?.userRole;
  const userError = useSelector(getUserError);
  const userStatus = useSelector(getUserStatus);
  const adminDataStatus = useSelector(getAdminDataStatus);
  const adminDataErr = useSelector(getAdminDataErr);
  const userDetails = useSelector((state) =>
    getUserDetailsById(state, currentUserId)
  );
  const getRentedCars = useSelector((state) =>
    getRentCarsByCustomerId(state, currentUserId)
  );
  const calculateCredits =
    getRentedCars.reduce(
      (sum, car) => (new Date(car.dropDate) < new Date() ? sum + 10 : sum),
      0
    ) || 0;
  const handleCopy = () => {
    navigator.clipboard.writeText("34fe5nd92");
    toast.info("Copied", toastOptionSuccess);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const data = await logoutAPI();
    if (data.status === true) {
      toast.success(data.message, toastOptionSuccess);
      navigate("/login");
      dispatch(removeCurrentUser());
    } else {
      toast.error("Error occured", toastOptionError);
    }
  };
  const handleUploadDp = async (pic) => {
    if (currentUserId && pic) {
      await dispatch(
        updateProfilePic({ userId: currentUserId, profilePic: pic })
      );
      if (userStatus === "fulfilled") {
        toast.success("Profile pic updated successfully", toastOptionSuccess);
      } else {
        toast.error(userError, toastOptionError);
      }
    } else {
      toastOptionError.warn("Please select an image", toastOptionSuccess);
    }
  };
  const handleProfilePicChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        handleUploadDp(reader.result);
      };
    }
  };
  const sendHostRequest = (e) => {
    e.preventDefault();
    if (currentUserId) {
      dispatch(addHostRequest({ userId: currentUserId }));
      if (adminDataStatus === "fulfilled") {
        toast.success("Host request sent successfully", toastOptionSuccess);
      } else {
        toast.error(adminDataErr, toastOptionError);
      }
    }
  };
  return (
    <Container>
      <div className="profile-card">
        <div className="user-info">
          <label className="profile-image-add">
            <img
              src={
                userDetails?.userProfilePic
                  ? userDetails.userProfilePic
                  : "/assets/user.png"
              }
            ></img>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
              max={1}
              name="profilePic"
            ></input>
          </label>
          {userDetails === undefined && <Skeleton count={3} width={"5rem"} />}
          <h3>{userDetails?.fullName}</h3>
          <p>{userDetails?.phoneNumber}</p>
          <p>{userDetails?.email}</p>
          <p>{userDetails?.city}</p>
          {currentUserRole && currentUserRole !== ROLE.HOST && currentUserRole!==ROLE.ADMIN && (
            <button className="positive-button" onClick={sendHostRequest}>
              Become a host
            </button>
          )}
        </div>
        <div className="line"></div>
        <NavLink className="link" to={`.`} end>
          <MdAccountBox />
          <p>Account</p>
        </NavLink>
        <div className="line"></div>
        <NavLink className="link" to={`bookings`}>
          <FaBuyNLarge />
          <p>My Bookings</p>
        </NavLink>
        <div className="line"></div>
        <NavLink className="link" to={`savedCar`}>
          <BsFillBookmarkFill />
          <p>Saved Cars</p>
        </NavLink>
        <div className="line"></div>
        <span className="credits">
          <span>
            <MdCreditScore />
            <p>Credits</p>
          </span>
          <p>+{calculateCredits} pts</p>
        </span>
        <div className="line"></div>
        <div className="promo-code">
          <AiFillGift />
          <div>
            <p>Promo Code</p>
            <p className="promo-info">Share your promo code to get 10% off</p>
            <span className="promo-number">
              <p>Your Promocode :</p>
              {userDetails === undefined && <Skeleton count={1} width={"5rem"} />}
              <p className="code">{userDetails?.registerReferralId}</p>
              <BiCopy onClick={handleCopy} />
            </span>
          </div>
        </div>
        <div className="line"></div>
        <span>
          <button className="negative-button" onClick={handleLogout}>
            <IoLogOutOutline />
            Logout
          </button>
        </span>
        <div className="line"></div>
      </div>
      <div className="side-container">
        {userDetails === undefined && (
          <Skeleton width={"100%"} height={"95%"} />
        )}
        {userDetails !== undefined && <Outlet context={{ userDetails }} />}
      </div>
      <ToastContainer />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding: 1.5rem;
  gap: 1rem;
  .profile-card {
    display: flex;
    align-self: center;
    flex-direction: column;
    gap: 0.5rem;
    width: 16rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    border: 1px solid #e0dfdf;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > p {
        color: #717171;
      }
      .profile-image-add {
        cursor: pointer;
        & > img {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
        }
      }
      & > button {
        padding: 0.25rem;
      }
    }
    .line {
      height: 1px;
      padding: 0 0.5rem;
      background-color: #e2e1e1;
    }
    .promo-code {
      display: flex;
      align-items: baseline;
      & > div {
        .promo-info {
          font-style: italic;
          color: #515151;
        }
        .promo-number {
          display: flex;
          align-items: center;
          color: rgb(81, 81, 81);
        }
      }
    }
    .active {
      color: #46b146;
    }
    .link {
      &:hover {
        color: #46b146;
      }
    }
    .link,
    & > span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      button {
        display: flex;
        align-items: center;
        padding: 0.25rem;
      }
    }
    .credits {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      & > p {
        color: rgb(2, 2, 254);
      }
    }
  }
  .side-container {
    flex: 0.85;
    height: 30rem;
    align-self: center;
    border-radius: 0.5rem;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #e0dfdf;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgb(72, 71, 71);
        border-radius: 1rem;
      }
    }
  }
  @media screen and (max-width: 680px) {
    flex-direction: column;
    .profile-card {
      flex: 1;
    }
    .side-container {
      flex: 1;
      width: 20rem;
      .my-account {
        .account-details,
        .personal-details {
          .inputs {
            gap: 0rem;
            flex-direction: column;
          }
        }
      }
      .my-bookings {
        .book-list {
          .single-book {
            .main-details {
              flex-direction: column;
              .status-date {
                align-items: flex-start;
                .status {
                  align-self: flex-start;
                }
                p {
                  text-align: start;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 681px) and (max-width: 905px) {
    .profile-card {
      flex: 1;
    }
    .side-container {
      flex: 1;
      width: 20rem;
      .my-account {
        .account-details,
        .personal-details {
          .inputs {
            gap: 0rem;
            flex-direction: column;
          }
        }
      }
      .my-bookings {
        .book-list {
          .single-book {
            .main-details {
              flex-direction: column;
              .status-date {
                align-items: flex-start;
                .status {
                  align-self: flex-start;
                }
                p {
                  text-align: start;
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default Profile;
