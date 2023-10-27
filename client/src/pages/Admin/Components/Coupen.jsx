import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CoupenTable from "./CoupenTable";
import PopAddCoupon from "./PopAddCoupen";
import { useSelector } from "react-redux";
import { getCouponDetails } from "../../../features/adminSlice";
function Coupen() {
  const couponData = useSelector(getCouponDetails);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const handleCoupon = () => {
    setShowAddCoupon(!showAddCoupon);
  };
  return (
    <Container>
      <div className="header">
        <h2>Coupons</h2>
        <Link className="positive-button" onClick={handleCoupon}>
          Add Coupon
        </Link>
        {showAddCoupon && <PopAddCoupon handleAddCoupon={handleCoupon} />}
      </div>
      <section>
        <header>
          {couponData && (
            <div className="counts">
              <p>All({couponData.length})</p>
              <p>|</p>
              <p>
                Active(
                {
                  couponData.filter(
                    (coupon) => new Date(coupon.expiryDate) >= new Date()
                  ).length
                }
                )
              </p>
            </div>
          )}
          <div className="search">
            <input type="text" placeholder="Search" />
            <button className="positive-button">Search Coupons</button>
          </div>
        </header>
        <CoupenTable />
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  height: 100%;
  border-radius: 0.25rem;
  gap: 1rem;
  padding: 1rem;
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .counts,
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
`;

export default Coupen;
