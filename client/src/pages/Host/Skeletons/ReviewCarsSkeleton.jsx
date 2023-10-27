import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
function ReviewCarsSkeleton({ value }) {
  return (
    <Container>
      {Array(value)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="car-card">
              <Skeleton
                width={"2.5rem"}
                height={"2.5rem"}
                borderRadius={"0.25rem"}
              />
              <span className="details">
                <Skeleton count={2} width={"5rem"} />
              </span>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  .car-card {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s ease-in-out;
    cursor: pointer;
    .details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }
`;

export default ReviewCarsSkeleton;
