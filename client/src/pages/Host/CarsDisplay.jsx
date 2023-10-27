import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getCurrentUser, getUserStatus } from "../../features/userSlice";
import { getCarListByOwnerId, getCarStatus } from "../../features/carSlice";
import HostCarCard from "./Components/CarDisplayCard";
import CarDisplaySkeleton from "./Skeletons/CarDisplaySkeleton";

const HostCars = () => {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const carList = useSelector((state) =>
    getCarListByOwnerId(state, currentUserId)
  );
  const carStatus = useSelector(getCarStatus);
  const userStatus = useSelector(getUserStatus);
  const displayValue =
    carList.length > 0 ? (
      carList.map((value, index) => {
        return <HostCarCard key={index} value={value} />;
      })
    ) : (
      <p className="no-car">No cars posted yet</p>
    );
  return (
    <Container>
      <h2>Your listed cars</h2>
      <div className="listed-cars-container">
        {userStatus === "pending" || carStatus === "pending" ? (
          <CarDisplaySkeleton value={4} />
        ) : (
          displayValue
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  overflow-x: hidden;
  .no-car{
    width: 100vw;
    text-align: center;
  }
  .listed-cars-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media screen and (min-width: 768px) {
    align-items: start;
    .listed-cars-container {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;
export default HostCars;
