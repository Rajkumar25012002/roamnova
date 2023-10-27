import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const CancellationPolicy = ({ handleCancellationPolicy }) => {
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose
          className="close-btn"
          onClick={handleCancellationPolicy}
        />
        <h3>Cancellation Policy</h3>
        <p>
          You're eligible for a full refund for cancellations made 24 hours
          before your booking start time.
        </p>
        <p>
          You're eligible for a 50% refund for cancellations made between 24
          hours to 6 hours before your booking start time.
        </p>
        <p>
          No refund will be issued for cancellations made in the last 6 hours
          before or after your booking start time.
        </p>
        <button className="normal-button" onClick={handleCancellationPolicy}>
          OK ,GOT IT
        </button>
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
    h3 {
      align-self: center;
      color: rgb(40, 167, 69);
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    h3 {
      margin: 0;
    }
    span {
      display: flex;
      justify-content: space-between;
    }
    .final-fare {
      font-weight: 600;
    }
  }
`;
export default CancellationPolicy;
