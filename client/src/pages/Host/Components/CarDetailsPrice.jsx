import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

const Price = () => {
  const { value } = useOutletContext();
  return (
    <Container>
      <span>
        <p>Rs.{value.carRent}</p>/day
      </span>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  span {
    display: flex;
    align-items: center;
    p {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;
export default Price;
