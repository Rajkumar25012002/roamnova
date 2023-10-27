import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import { addCoupen } from "../../../features/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../../features/userSlice";
import Data from "../../../data/data.json";

const AddCoupon = ({ handleAddCoupon }) => {
  const [coupenData, setCouponData] = useState({
    couponFor: [],
  });
  const currentUserId = useSelector(getCurrentUser).userId;
  const dispatch = useDispatch();
  const handleChange = (e, actionMeta) => {
    if (actionMeta) {
      const { name } = actionMeta;

      if (name === "couponType") {
        setCouponData({
          ...coupenData,
          couponType: e.value,
          couponFor: [],
        });
      } else if (name === "couponFor") {
        const selectedValues = e.map((option) => option.value);
        setCouponData({
          ...coupenData,
          couponFor: selectedValues,
        });
      }
    } else if (e.target.name) {
      const { name, value } = e.target;
      setCouponData({
        ...coupenData,
        [name]: value,
      });
    }
  };
  const handleCoupon = (e) => {
    e.preventDefault();
    dispatch(
      addCoupen({
        couponCode: coupenData.couponCode,
        couponType: coupenData.couponType,
        couponFor: coupenData.couponFor,
        couponDescription: coupenData.couponDescription,
        couponLimit: coupenData.couponLimit,
        startingDate: coupenData.startingDate,
        expiryDate: coupenData.expiryDate,
        offerPercentage: coupenData.offerPercentage,
        couponBy: currentUserId,
      })
    );
    handleAddCoupon();
  };
  const generateCode = (e) => {
    e.preventDefault();
    const code =
      coupenData.couponType.toUpperCase() + coupenData.offerPercentage;
    setCouponData({
      ...coupenData,
      couponCode: code,
    });
  };
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-btn" onClick={handleAddCoupon} />
        <h3>Add Coupon</h3>
        <form onSubmit={handleCoupon}>
          <label>
            <p>Coupon Type</p>
            <Select
              options={Data.coupon.optionsHead}
              name="couponType"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Coupon For</p>
            <Select
              options={Data.coupon.optionsType[coupenData.couponType]}
              name="couponFor"
              isMulti
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Discount Percent</p>
            <input
              type="number"
              step={5}
              max={100}
              id="offer_percentage"
              min={5}
              name="offerPercentage"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Coupon code</p>
            <input
              type="text"
              id="code"
              name="couponCode"
              value={coupenData.couponCode}
            />
            <button className="positive-button" onClick={generateCode}>
              Generate
            </button>
          </label>
          <label>
            <p>Active On</p>
            <input
              type="datetime-local"
              id="active_date"
              name="startingDate"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Expire On</p>
            <input
              type="datetime-local"
              name="expiryDate"
              id="expiry_date"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Description</p>
            <textarea
              type="text"
              name="couponDescription"
              id="descript"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Limit</p>
            <input
              type="number"
              min="1"
              id="limits"
              max="10"
              name="couponLimit"
              onChange={handleChange}
            />
          </label>

          <button className="normal-button" type="submit">
            Add
          </button>
        </form>
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
    @media screen and(max-width: 680px) {
      width: 20rem;
    }
    h3 {
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
    form {
      display: flex;
      flex-direction: column;
      padding: 0.25rem;
      gap: 0.5rem;
      width: 20rem;
      height: 25rem;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0.25rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 0.5rem;
        }
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        p {
          font-weight: bold;
        }
        textarea {
          resize: none;
          height: 5rem;
        }
      }
    }
  }
`;
export default AddCoupon;
