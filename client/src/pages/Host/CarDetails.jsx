import React from "react";
import styled from "styled-components";
import { Link, NavLink, useParams, Outlet } from "react-router-dom";
import { BsSpeedometer2, BsGearFill } from "react-icons/bs";
import { MdHeight, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { GiSwanBreeze } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { getCarDetailsById } from "../../features/carSlice";
import formatDateTime from "../../utils/functions/formatDateTime";
import CarDetailSkeleton from "./Skeletons/CarDetailSkeleton";
import Skeleton from "react-loading-skeleton";

const HostCarDetails = () => {
  const { id } = useParams();
  const value = useSelector((state) => getCarDetailsById(state, id));
  return (
    <Container>
      <Link to=".." end="true">
        <GoArrowLeft />
        Back to all cars
      </Link>
      <div className="car-details">
        {value === undefined ? (
          <CarDetailSkeleton value={1} />
        ) : (
          <div className="single-car">
            <div className="image">
              <img src={value?.carPhotos[0]}></img>
            </div>
            <div className="car-info">
              <span className="fuel-pick-category">
                <p className="category">{value?.carCategory}</p>
                <p className="fuel">{value?.additionalInfo?.fuelType}</p>
              </span>
              <p className="car-name">{value?.carName}</p>
              <h4 className="car-model">{value?.additionalInfo?.carModel}</h4>
              <span className="seat-gear">
                <p className="seats">
                  <MdOutlineAirlineSeatReclineNormal />4 seats
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
                  <GiSwanBreeze />
                  {value?.additionalInfo?.ac === "Yes"
                    ? "AC Conditioned"
                    : "Non-AC"}
                </p>
              </span>
              <span className="price">
                <p className="rent">&#x20B9;{value?.carRent}</p>
                <p>/day</p>
              </span>
              {value?.carPostedOn && (
                <p className="posted">
                  Posted on {formatDateTime(new Date(value?.carPostedOn))}
                </p>
              )}
            </div>
          </div>
        )}
        <main className="more-details">
          <nav>
            <NavLink to="." end="true">
              Info
            </NavLink>
            <NavLink to="price">Price</NavLink>
            <NavLink to="photos">Photos</NavLink>
            <NavLink to="edit">Edit</NavLink>
            <NavLink to="delete">Delete</NavLink>
          </nav>
          {value === undefined ? (
            <Skeleton width={"100%"} height={"100%"} />
          ) : (
            <Outlet context={{ value }} />
          )}
        </main>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  & > a {
    display: flex;
    align-items: center;
  }
  .car-details {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: white;
    gap: 0.5rem;
    .single-car {
      display: flex;
      flex-direction: column;
      .image {
        & > img {
          width: 20rem;
          object-fit: cover;
          border-radius: 0.25rem;
        }
      }
      .car-info {
        display: flex;
        flex-direction: column;
        .fuel-pick-category {
          display: flex;
          & > * {
            color: rgb(139, 139, 139);
            border: 1px solid rgb(217, 217, 217);
            padding: 0 0.2rem;
            border-radius: 0.25rem;
          }
        }
        & > span {
          display: flex;
          justify-content: space-between;
        }
        .car-name {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .price {
          justify-content: flex-start;
          .rent {
            font-weight: 600;
          }
        }
        .posted {
          font-size: small;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    .car-details {
      flex-direction: row;
      gap: 3rem;
    }
    .more-details {
      flex: 1;
      /* width: 80%; */
    }
  }
`;
export default HostCarDetails;
