import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCar } from "../../../features/carSlice";
import { useOutletContext } from "react-router-dom";
function CarDetailsDelete() {
  const dispatch = useDispatch();
  const { value } = useOutletContext();
  const handleDeleteCar = (e) => {
    e.preventDefault();
    if (value.carId) {
      dispatch(deleteCar({ carId: value.carId }));
      Navigate("/host/cars");
    }
  };
  return (
    <Container>
      <button className="negative-button" onClick={handleDeleteCar}>
        Delete
      </button>
    </Container>
  );
}

const Container = styled.div``;

export default CarDetailsDelete;
