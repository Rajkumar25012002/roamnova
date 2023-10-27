import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserDetailsById,
} from "../../../features/userSlice";
import Skeleton from "react-loading-skeleton";

function Panel() {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const userDetails = useSelector((state) =>
    getUserDetailsById(state, currentUserId)
  );

  return (
    <Container>
      <div className="panel">
        <div className="admin-profile">
          {userDetails === undefined ? (
            <>
            <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"}/>
            <Skeleton width={"5rem"}/>
            </>
          ) : (
            <>
              <img src={userDetails?.userProfilePic}></img>
              <p className="name">{userDetails?.fullName}</p>
            </>
          )}
        </div>
        <NavLink to="." end>
          <MdDashboard />
          Dashboard
        </NavLink>
        <NavLink to="hostRequest">
          <CiSquareQuestion />
          Host Requests
        </NavLink>
        <NavLink to="coupen">
          <BiSolidOffer />
          Coupen
        </NavLink>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .panel {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    width: 15rem;
    height: 100%;
    border-radius: 0.25rem;
    .admin-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      & > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      & > p {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
      }
    }
    & > a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ededed;
      &:hover {
        border-right: 0.25rem solid green;
      }
    }
    .active {
      border-right: 0.25rem solid green;
    }
  }
`;

export default Panel;
