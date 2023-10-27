import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
function TransactionSkeleton({ value }) {
  return (
    <Container>
      {Array(value)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="single-transaction">
              <div className="transaction-info">
                <span className="customer">
                  <Skeleton
                    width={"2.5rem"}
                    height={"2.5rem"}
                    borderRadius={"50%"}
                  />
                  <Skeleton width={"5rem"} />
                </span>
                <Skeleton width={"10rem"} />
              </div>
              <Skeleton width={"5rem"} />
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  gap: 0.5rem;
  .single-transaction {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
    border-radius: 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    background-color: white;
    .transaction-info {
      .customer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
`;

export default TransactionSkeleton;
