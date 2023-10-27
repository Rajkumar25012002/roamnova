import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

const Description = () => {
  const { value } = useOutletContext();
  return (
    <Container>
      <span>
        <p>Name :</p>
        {value?.carName}
      </span>
      <span>
        <p>Category :</p>
        {value?.carCategory}
      </span>
      <p>Description</p>
      <div>{value?.carDescription}</div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  span {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-align: justify;
    p {
      margin: 0;
      font-weight: 600;
    }
  }
  p {
    margin: 0;
    font-weight: 600;
  }
  div {
    text-align: justify;
  }
`;
export default Description;
