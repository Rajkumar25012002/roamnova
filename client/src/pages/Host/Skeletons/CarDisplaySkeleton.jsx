import React from "react";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, NavLink } from "react-router-dom";
const DashBoardSkeleton = ({ value }) => {
  return (
    <Container>
      {Array(value)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="car-info">
              <Link>
                <div className="img-name">
                  <Skeleton count={1} width={"7.5rem"} height={"5rem"} />
                  <div className="car-detail">
                    <Skeleton count={3} />
                  </div>
                </div>
              </Link>
              <div className="additional-information">
                <Skeleton count={3} />
              </div>
            </div>
          );
        })}
    </Container>
  );
};
const Container = styled.div`
  .car-info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.25rem;
    width: 20rem;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2);
    & > a {
      .img-name {
        display: flex;
        gap: 1rem;
        .car-detail {
          display: flex;
          flex-direction: column;
          & > * {
            width: 5rem;
          }
        }
      }
    }
    .additional-information {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      & > * {
        width: 5rem;
      }
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    .car-info {
      flex-direction: row;
      justify-content: space-between;
      width: 30rem;
      & > a {
        .img-name {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          .car-detail {
            display: flex;
            flex-direction: column;
            & > * {
              width: 5rem;
            }
          }
        }
      }
      .additional-information {
        align-items: end;
        & > * {
          align-self: end;
        }
      }
    }
  }
`;
export default DashBoardSkeleton;
