import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
function CarDetailSkeleton({ value }) {
  return (
    <Container>
      {Array(value)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="single-car">
              <div className="image-review">
                <Skeleton
                  width={"18rem"}
                  height={"12rem"}
                  borderRadius={"0.25rem"}
                />
              </div>
              <div className="car-info">
                <span className="fuel-pick-category">
                  <Skeleton count={1} width={"3rem"} />
                  <Skeleton count={1} width={"3rem"} />
                </span>
                <Skeleton width={"10rem"} />
                <Skeleton width={"5rem"} />
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
                <Skeleton count={1} width={"8rem"} />
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
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
    .car-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      & > span {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`;

export default CarDetailSkeleton;
