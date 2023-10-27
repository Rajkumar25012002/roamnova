import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const PriceBreakUp = ({
  handleShowPriceBreakUp,
  value,
  priceAfterDiscount,
  discount,
  daysDifference,
}) => {
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose
          className="close-btn"
          onClick={handleShowPriceBreakUp}
        />
        <h2>Price Breakup</h2>
        <span>
          <p>Trip Fare</p>
          <p>&#x20B9;{Number(value)*daysDifference}</p>
        </span>
        <div className="line"></div>
        <span>
          <p>Damage Protection Fee</p>
          <p>&#x20B9;399</p>
        </span>
        <div className="line"></div>
        <span>
          <p>Convenience Fee</p>
          <p>&#x20B9;99</p>
        </span>
        <div className="line"></div>
        <span>
          <p>Discount</p>
          <p>-&#x20B9;{discount}</p>
        </span>
        <div className="line"></div>
        <span className="final-fare">
          <p>Total Fare</p>
          <p>
            {priceAfterDiscount.toLocaleString("hi-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            })}
          </p>
        </span>
        <div className="line"></div>
        <button className="normal-button" onClick={handleShowPriceBreakUp}>
          Continue
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
    width: 20rem;
    height: max-content;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    h2 {
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
    span {
      display: flex;
      justify-content: space-between;
    }
    .final-fare {
      font-weight: 600;
    }
  }
`;
export default PriceBreakUp;
