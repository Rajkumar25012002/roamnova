import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

const Photos = () => {
  const { value } = useOutletContext();
  return (
    <Container>
      <div className="photos">
        {value.carPhotos.map((value, index) => {
          return <img key={index} src={value}></img>;
        })}
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .photos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    img {
      width: 5rem;
      border-radius: 0.25rem;
    }
  }
`;
export default Photos;
