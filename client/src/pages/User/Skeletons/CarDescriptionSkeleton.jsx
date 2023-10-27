import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
function CarDescriptionSkeleton({ value }) {
  return (
    <Container>
      {Array(value)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="single-car">
              <Link>
                <div className="image-review">
                  <Skeleton
                    width={"20rem"}
                    height={"15rem"}
                    borderRadius={"0.25rem"}
                  />
                </div>
              </Link>
              <div className="car-info">
                <span className="fuel-pick-category">
                  <Skeleton count={1} width={"3rem"} />
                  <Skeleton count={1} width={"3rem"} />
                  <Skeleton count={1} width={"3rem"} />
                </span>
                <Skeleton width={"10rem"} />
                <span className="seat-gear">
                  <Skeleton count={1} width={"5rem"} />
                  <Skeleton count={1} width={"5rem"} />
                </span>
                <span className="mileage-ac">
                  <Skeleton count={1} width={"5rem"} />
                  <Skeleton count={1} width={"5rem"} />
                </span>
                <span className="price-details">
                  <Skeleton count={1} width={"5rem"} />
                </span>
                <Skeleton count={1} width={"5rem"} />
              </div>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  .single-car {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    align-items: center;
    .car-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .fuel-pick-category {
        & > * {
          padding: 0 0.2rem;
          border-radius: 0.25rem;
        }
      }
      & > span {
        display: flex;
        gap: 0.5rem;
      }
      .price-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  @media screen and (max-width: 575px) {
    .single-car {
      flex-direction: column;
    }
  }
`;

export default CarDescriptionSkeleton;
