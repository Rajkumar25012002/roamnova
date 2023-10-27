import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../../utils/functions/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsSpeedometer2, BsGearFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserStatus,
  getUserError,
  updateSavedCars,
  getCurrentUser,
  getUserDetailsById,
} from "../../../features/userSlice";
import { SearchContext } from "../../../App";
import { useContext } from "react";
import {
  getRentCarCountByCarId,
  getAllRentCarDetails,
} from "../../../features/rentalCarSlice";
const SingleCarCard = ({ value }) => {
  const { searchQuery } = useContext(SearchContext);
  const dispatch = useDispatch();
  const trips = useSelector((state) =>
    getRentCarCountByCarId(state, value.carId)
  );
  const currentUser = useSelector(getCurrentUser);
  const currentUserSavedCars = useSelector((state) =>
    getUserDetailsById(state, currentUser?.userId)
  )?.savedCars;
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const averageReview =
    value?.carReviews.reduce((a, c) => a + c.ratings, 0) /
      value?.carReviews.length || 0;
  const noOfReviews = value?.carReviews.length || 0;
  const timeDifference = Math.abs(
    new Date(searchQuery.endDate) - new Date(searchQuery.startDate)
  );
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) || 1;
  const count = useSelector(getAllRentCarDetails).length;
  const isTopPick = (trips / count) * 100 > 35;
  const handleSavedCars = () => {
    try {
      dispatch(
        updateSavedCars({ userId: currentUser?.userId, carId: value.carId })
      );
      if (status === "fulfilled") {
        toast.success("Added to Saved Cars", toastOptionSuccess);
      } else {
        toast.error(error, toastOptionError);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CarWrapper>
      <div className="single-car">
        <Link to={`/cars/${value?.carId}`}>
          <div className="image-review">
            <img src={value?.carPhotos[0]}></img>
            <div className="review">
              <span>
                <AiFillStar />
                {averageReview}
              </span>
              <p>{noOfReviews}reviews</p>
              <p>{`${trips}trips`}</p>
            </div>
          </div>
        </Link>
        <div className="car-info">
          <span className="fuel-pick-category">
            <p className="category">{value?.carCategory}</p>
            <p className="fuel">{value?.additionalInfo?.fuelType}</p>
            {isTopPick && <p className="pick">Top Pick</p>}
          </span>
          <h3 className="car-name">{value?.carName}</h3>
          <span className="seat-gear">
            <p className="seats">
              <MdOutlineAirlineSeatReclineNormal />
              {`Seats-${value?.additionalInfo?.seats}`}
            </p>
            <p className="gear">
              <BsGearFill />
              {`Gear-${value?.additionalInfo?.gearType}`}
            </p>
          </span>
          <span className="mileage-ac">
            <p className="mileage">
              <BsSpeedometer2 />
              {`${value?.additionalInfo?.averageMileage}kms/ltr`}
            </p>
            <p className="ac">
              <TbAirConditioning />
              {value?.additionalInfo?.ac === "Yes"
                ? "AC Conditioned"
                : "Non-AC"}
            </p>
          </span>
          <span className="price-details">
            <p>
              {`
              ${(Number(value?.carRent) * daysDifference).toLocaleString(
                "hi-IN",
                {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                }
              )}
              ${daysDifference > 1 ? "(" + daysDifference + " days)" : "/day"}`}
            </p>
            <Link to={`/cars/${value?.carId}`} className="primary-button">
              View Deal
            </Link>
            {currentUserSavedCars && (
              <BsFillBookmarkFill
                onClick={handleSavedCars}
                className={`${
                  currentUserSavedCars.includes(value?.carId) ? "saved" : ""
                }`}
              />
            )}
          </span>
        </div>
      </div>
      <ToastContainer />
    </CarWrapper>
  );
};
const CarWrapper = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  .single-car {
    display: flex;
    gap: 1rem;
    align-items: center;
    .image-review {
      img {
        width: 12rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 0.25rem;
      }
      .review {
        display: flex;
        align-items: center;
        justify-content: space-around;
        span {
          display: flex;
          align-items: center;
          & > svg {
            color: orange;
          }
        }
      }
    }
    .car-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .fuel-pick-category {
        & > * {
          color: rgb(139, 139, 139);
          border: 1px solid rgb(217, 217, 217);
          padding: 0 0.2rem;
          border-radius: 0.25rem;
        }
      }
      & > span {
        display: flex;
        gap: 0.5rem;
        .seats,
        .mileage {
          width: 6rem;
        }
      }
      .price-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .primary-button {
          padding: 0 0.25rem;
        }
        .saved {
          color: rgb(2, 132, 208);
        }
        svg {
          color: rgb(150, 149, 149);
          transition: 0.2s ease-in-out;
          &:hover {
            color: rgb(2, 132, 208);
          }
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    .single-car {
      flex-direction: column;
    }
  }
`;
export default SingleCarCard;
