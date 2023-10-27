import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getRentCarsByCarId } from "../../../features/rentalCarSlice";
import formatDateTime from "../../../utils/functions/formatDateTime";

const HostCarCard = ({ value }) => {
  const rentDetailsForCar = useSelector((state) =>
    getRentCarsByCarId(state, value.carId)
  );
  const isBooked = rentDetailsForCar.find(
    (car) => new Date(car.dropDate) > new Date()
  );
  return (
    <Container>
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
    </Container>
  );
};
const Container = styled.div`
  .car-info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    align-items: center;
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
      align-self: start;
      gap: 0.25rem;
      & > a {
        display: flex;
        align-self: start;
        align-items: center;
        padding: 0.05rem 0.25rem;
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
  @media screen and (min-width: 768px) {
    .car-info {
      flex-direction: row;
      flex-wrap: wrap;
      width: 30rem;
      justify-content: space-between;
      .additional-information {
        align-items: end;
        & > a {
          align-self: flex-end;
        }
      }
    }
  }
`;
export default HostCarCard;
