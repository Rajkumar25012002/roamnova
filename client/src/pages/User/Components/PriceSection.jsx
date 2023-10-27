import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptionSuccess } from "../../../utils/functions/toastOptions";
import { MdLocalOffer } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import PriceBreakUp from "../Components/PopCarFareSummary";
import { getCouponDetails } from "../../../features/adminSlice";
import { getUserDetailsById } from "../../../features/userSlice";
import { useContext } from "react";
import { SearchContext } from "../../../App";
import isEligibleForCoupon from "../../../utils/functions/CoupenEligible";

function PriceSection({ value, carType }) {
  const couponRef = useRef();
  const { searchQuery } = useContext(SearchContext);
  let couponDetails = useSelector(getCouponDetails).filter(
    (coupon) => new Date(coupon.expiryDate) > new Date()
  );
  couponDetails =
    couponDetails &&
    couponDetails.filter((coupon) =>
      isEligibleForCoupon(
        coupon.couponCode,
        coupon.couponType,
        coupon.couponFor,
        coupon.couponLimit,
        carType
      )
    );
  const [toggle, setToggle] = useState(false);
  const [showPriceBreakUp, setShowPriceBreakUp] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const selectedCouponDetails =
    couponDetails &&
    couponDetails.filter((coupon) => coupon.couponCode === couponCode);
  const [showApplyCode, setShowApplyCode] = useState(false);
  const timeDifference = Math.abs(
    new Date(searchQuery.endDate) - new Date(searchQuery.startDate)
  );
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) || 1;
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleShowPriceBreakUp = () => {
    setShowPriceBreakUp(!showPriceBreakUp);
  };
  const ownerData = useSelector((state) =>
    getUserDetailsById(state, value?.userId)
  );

  const handleCodeCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.info(`Copied ${value}`, toastOptionSuccess);
  };
  const priceAfterDiscount =
    Math.round(
      (Number(value?.carRent) * daysDifference + 99 + 399) *
        (1 - selectedCouponDetails[0]?.offerPercentage / 100),
      0
    ) || Number(value?.carRent) * daysDifference;
  const discount =
    Math.round(
      (Number(value?.carRent) * daysDifference + 99 + 399) *
        (selectedCouponDetails[0]?.offerPercentage / 100),
      0
    ) || 0;
  const handleCouponApply = () => {
    setCouponCode(couponRef.current.value);
  };
  return (
    <Container>
      <div className="price-breakup-section">
        <div className="promo-card">
          <span className="apply-header">
            <h4
              onClick={() => {
                setShowApplyCode(!showApplyCode);
              }}
            >
              Apply Coupen
            </h4>
            {!showApplyCode && (
              <FaAngleRight
                onClick={() => {
                  setShowApplyCode(!showApplyCode);
                }}
              />
            )}
            {showApplyCode && (
              <FaAngleDown
                onClick={() => {
                  setShowApplyCode(!showApplyCode);
                }}
              />
            )}
          </span>
          {showApplyCode && <label>Enter your code</label>}
          {showApplyCode && <input type="text" ref={couponRef}></input>}
          {showApplyCode && (
            <button className="positive-button" onClick={handleCouponApply}>
              Apply
            </button>
          )}
          {couponDetails &&
            showApplyCode &&
            couponDetails.map((value, index) => {
              return (
                <div className="coupon-code" key={index}>
                  <MdLocalOffer />
                  <span>
                    <p>
                      {value?.couponCode}
                      <BiCopy
                        onClick={() => handleCodeCopy(value?.couponCode)}
                      />
                    </p>
                    <p>{value?.couponDescription}</p>
                  </span>
                  {couponCode === value?.couponCode && (
                    <button
                      className="negative-button"
                      onClick={() => {
                        setCouponCode("");
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
        </div>
        <div className="price-break-up">
          <p>Please review the final fare</p>
          <div className="price-det">
            <h4>
              {priceAfterDiscount.toLocaleString("hi-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            </h4>
            <span onClick={handleShowPriceBreakUp} className="fare-summary">
              <p>Fare Summary</p>
              <GrCopy />
            </span>
          </div>
          <Link className="normal-button" to={`rentcar`} onClick={handleToggle}>
            Continue
          </Link>
          {toggle && (
            <Outlet
              context={{
                ownerData,
                value,
                handleToggle,
                priceAfterDiscount,
                couponCode,
              }}
            />
          )}
          {showPriceBreakUp && (
            <PriceBreakUp
              value={value?.carRent}
              handleShowPriceBreakUp={handleShowPriceBreakUp}
              priceAfterDiscount={priceAfterDiscount}
              daysDifference={daysDifference}
              discount={discount}
            />
          )}
        </div>
        <ToastContainer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .price-breakup-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .promo-card,
    .price-break-up {
      display: flex;
      align-self: center;
      flex-direction: column;
      padding: 0.5rem;
      border-radius: 0.25rem;
      gap: 0.5rem;
      width: 18rem;
      border: 1px solid #afafaf;
      h4 {
        cursor: pointer;
      }
      .coupon-code {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        padding: 0.25rem;
        border: 1px solid #afafaf;
        border-radius: 0.25rem;
        & > svg {
          margin-top: 0.25rem;
        }
        & > span {
          display: flex;
          flex: 1;
          flex-direction: column;
        }
        & > .negative-button {
          padding: 0.1rem;
          font-size: small;
        }
      }
      .apply-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .price-det {
        display: flex;
        justify-content: space-between;
        .fare-summary {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }
      & > a {
        padding: 0.25rem;
      }
    }
  }
`;

export default PriceSection;
