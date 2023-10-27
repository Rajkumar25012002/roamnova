import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { AiFillStar, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getCurrentUser, getUserStatus } from "../../features/userSlice";
import {
  getCarListByOwnerId,
  getCarIdListByOwnerId,
  getCarStatus,
} from "../../features/carSlice";
import { getRentCarsByCarId } from "../../features/rentalCarSlice";
import formatDateTime from "../../utils/functions/formatDateTime";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DashBoardSkeleton from "./Skeletons/DashBoardSkeleton";
const DashBoard = () => {
  let rentDetailsForCar;
  let isBooked;
  const carStatus = useSelector(getCarStatus);
  const userStatus = useSelector(getUserStatus);
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const carIdList = useSelector((state) =>
    getCarIdListByOwnerId(state, currentUserId)
  );
  const ownerCarInRentList = useSelector((state) =>
    getRentCarsByCarId(state, carIdList)
  );
  const totalIncome =
    ownerCarInRentList &&
    ownerCarInRentList
      .filter((car) => new Date(car.dropDate) < new Date())
      .reduce(
        (sum, car) =>
          new Date(car.dropDate).getMonth() === new Date().getMonth()
            ? sum + Number(car.rentalAmount)
            : sum,
        0
      );

  const carList = useSelector((state) =>
    getCarListByOwnerId(state, currentUserId)
  );
  const averageRatings = carList
    ? carList.reduce((total, car) => {
        if (car.carReviews.length > 0) {
          return (
            total +
            car.carReviews.reduce((sum, review) => sum + review.ratings, 0) /
              car.carReviews.length
          );
        } else {
          return total;
        }
      }, 0) /
      carList.reduce(
        (count, car) => (car.carReviews.length > 0 ? count + 1 : count),
        0
      )
    : 0;
    const displayValue=carList.length>0?carList.map((value, index) => {
      return <SingleCar key={index} value={value} />;
    }):<p className="no-car">No cars listed</p>
  const SingleCar = ({ value }) => {
    const rentDetailsForCar = useSelector((state) =>
      getRentCarsByCarId(state, value.carId)
    );
    isBooked = rentDetailsForCar.find(
      (car) => new Date(car.dropDate) > new Date()
    );
    return (
      <div className="car-info">
        <Link to={`/host/cars/${value.carId}`}>
          <div className="img-name">
            <img src={value?.carPhotos[0]}></img>
            <div className="car-detail">
              <h3>{value?.carName}</h3>
              <p>{value?.carNumber}</p>
              <p>
                {Number(value?.carRent).toLocaleString("hi-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })}
                /day
              </p>
            </div>
          </div>
        </Link>
        <div className="additional-information">
          <NavLink
            to={`/host/cars/${value.carId}/edit`}
            className="positive-button"
          >
            <AiFillEdit />
            Edit
          </NavLink>
          <p className="status">{`${isBooked ? "Booked" : "Available"}`}</p>
          <p className="posted">
            Posted on {formatDateTime(new Date(value?.carPostedOn))}
          </p>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <div className="main-display">
        <div className="welcome-container">
          <div>
            <h1>Welcome!</h1>
            <p>Income for this month</p>
            <h3>
              {totalIncome.toLocaleString("hi-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              }) || <Skeleton />}
            </h3>
          </div>
          <Link className="secondary-button" to="/host/income">
            Details
          </Link>
        </div>
        <div className="review-container">
          <span className="review-header">
            <h2>Review score</h2>
            <div className="rate-stars">
              <AiFillStar></AiFillStar>
              <p className="average">
                {averageRatings.toFixed(1) || <Skeleton />}
              </p>
              <p>Overall</p>
            </div>
          </span>
          <Link className="secondary-button" to="/host/reviews">
            Details
          </Link>
        </div>
      </div>
      <div className="listed-cars">
        <div className="listed-cars-header">
          <h2>Your listed cars</h2>
          <Link to="/host/cars">View all</Link>
        </div>
        <div className="listed-cars-container">
          {carStatus === "pending" || userStatus === "pending" ? (
            <DashBoardSkeleton value={4} />
          ) : displayValue}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  .no-car{
    text-align: center;
  }
  .main-display {
    display: flex;
    flex-direction: column;
    width: 90%;
    .welcome-container {
      display: flex;
      border-radius: 0.25rem 0.25rem 0 0;
      background: rgba(40, 167, 69, 0.5);
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      & > div {
        display: flex;
        flex-direction: column;
      }
    }
    .review-container {
      display: flex;
      border-radius: 0 0 0.25rem 0.25rem;
      background: rgba(40, 167, 69, 0.75);
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      .review-header {
        display: flex;
        flex-direction: column;
        flex: 0.75;
        .rate-stars {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          .average {
            font-weight: 600;
            font-size: 1.125rem;
          }
          svg {
            color: gold;
          }
        }
      }
    }
  }
  .listed-cars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
    padding: 1rem;
    .listed-cars-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .listed-cars-container {
      display: flex;
      flex-direction: column;
      & > .car-info:nth-child(even) {
        background-color: rgb(243, 243, 243);
      }
      .car-info {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        border-radius: 0.25rem;
        gap: 1rem;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2);
        & > a {
          .img-name {
            display: flex;
            gap: 1rem;
            align-items: center;
            & > img {
              width: 7.5rem;
              border-radius: 0.25rem;
            }
            .car-detail {
              display: flex;
              flex-direction: column;
            }
          }
        }
        .additional-information {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          & a {
            display: flex;
            align-self: start;
            align-items: center;
            padding: 0.02rem 0.025rem;
          }
          .posted {
            font-size: small;
          }
          .status {
            border: 1px solid grey;
            padding: 0 0.25rem;
            border-radius: 0.25rem;
            width: max-content;
          }
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: normal;
    .main-display {
      flex: 0.35;
      align-items: center;
      .welcome-container,
      .review-container {
        width: 20rem;
      }
    }
    .listed-cars {
      flex: 0.65;
      padding-top: 0;
      & > * {
        width: 80%;
      }
      .listed-cars-container {
        flex-wrap: nowrap;
        .car-info {
          flex-direction: row;
          justify-content: space-between;
          .additional-information {
            align-items: end;
            & > a {
              align-self: end;
            }
          }
        }
      }
    }
  }
`;
export default DashBoard;
