import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const ConfirmPopup = ({ handlePopUp, value, carName }) => {
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-btn" onClick={handlePopUp} />
        <h2>{carName || "carName"}</h2>
        <Carousel showArrows={true}>
          {value.map((img, index) => {
            return (
              <div key={index}className="image-container">
                <img src={img}/>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    height: max-content;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    h2 {
      align-self: center;
      color: rgb(40, 167, 69);
      margin-top: 1rem;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .carousel-root{
      width:30rem;
      @media screen and (max-width:575px){
        width:20rem;
      }
    }

  }
`;
export default ConfirmPopup;

