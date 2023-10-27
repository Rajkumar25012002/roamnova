import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmPopup = ({ handlePopUp, handleFunction }) => {
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-btn" onClick={handlePopUp} />
        <h2>Are you sure want to proceed?</h2>
        <div className="button-container">
          <button className="negative-button" onClick={handlePopUp}>
            NO
          </button>
          <button className="primary-button" onClick={handleFunction}>
            Yes
          </button>
        </div>
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
  background-color: rgba(0, 0, 0, 0.05);
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
    .button-container {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }
  }
`;
export default ConfirmPopup;
