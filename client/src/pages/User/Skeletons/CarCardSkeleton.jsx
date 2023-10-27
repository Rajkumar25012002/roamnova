import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
function CarCardSkeleton({ value }) {
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
                    width={"12rem"}
                    height={"8rem"}
                    borderRadius={"0.25rem"}
                  />
                  <div className="review">
                    <span>
                      <Skeleton width={"2rem"} />
                    </span>
                    <Skeleton count={1} width={"3rem"} />
                    <Skeleton count={1} width={"3rem"} />
                  </div>
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
                  <Skeleton count={1} width={"4rem"} />
                  <Skeleton count={1} width={"4rem"} />
                  <Skeleton count={1} width={"2rem"} />
                </span>
              </div>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  height: max-content;
  border-radius: 0.25rem;
  cursor: pointer;
  .single-car {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    align-items: center;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    .image-review {
      .review {
        display: flex;
        align-items: center;
        justify-content: space-around;
        span {
          display: flex;
          align-items: center;
        }
      }
    }
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

export default CarCardSkeleton;
