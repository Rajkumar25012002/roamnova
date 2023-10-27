import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, getUserDetailsById } from "../../features/userSlice";
import { getRentCarsByCustomerId } from "../../features/rentalCarSlice";

export default function isEligibleForCoupon(
  code,
  type,
  applicable,
  limit,
  carType
) {
  const currentUserId = useSelector(getCurrentUser).userId;
  const userDetails = useSelector((state) =>
    getUserDetailsById(state, currentUserId)
  );
  const rentedDetails = useSelector((state) =>
    getRentCarsByCustomerId(state, currentUserId)
  );
  const getCouponUsedCount = rentedDetails.reduce(
    (a, b) => (b.couponCode === code ? a + 1 : a),
    0
  );
  if (type === "car") {
    
    return getCouponUsedCount < limit && applicable.includes(carType);
  }
  if (type === "user") {
    const newUser = rentedDetails === undefined || rentedDetails.length === 0;
    
    const loyal =
      new Date(userDetails.createdOn).getMonth() < new Date().getMonth() - 2 &&
      rentedDetails.length > 0;
    const referral = userDetails.userReferralId !== undefined;
    const typeOfUser = referral
      ? "Referral"
      : newUser
      ? "New"
      : loyal
      ? "Loyal"
      : "user";
    return getCouponUsedCount < limit && applicable.includes(typeOfUser);
  }
  if (type === "trip") {
    return (
      getCouponUsedCount < limit &&
      applicable.some((e) => Number(e) <= (rentedDetails.length || 0))
    );
  }
  return false;
}
