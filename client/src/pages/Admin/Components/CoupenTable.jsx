import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getCouponDetails } from "../../../features/adminSlice";
import { useMediaQuery } from "@uidotdev/usehooks";
import "../../../App.css";
import formatDateTime from "../../../utils/functions/formatDateTime";
function CoupenTable() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 575px)");
  const isMediumDevice = useMediaQuery("only screen and (max-width : 775px)");
  const isLargeDevice = useMediaQuery("only screen (max-width : 975px)");
  const couponData = useSelector(getCouponDetails);
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      width: "5rem",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "5rem",
      hide: "md",
    },
    {
      name: "Applicable for",
      selector: (row) => row.includes,
      width: "10rem",
      hide: "sm",
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      width: "6rem",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "7rem",
      hide: "md",
    },
    {
      name: "Expiry",
      selector: (row) => row.expiry,
      width: "7.5rem",
      hide: "lg",
    },
    {
      name: "Limit",
      selector: (row) => row.limit,
      width: "5rem",
      hide: "lg",
    },
  ];
  const data =
    couponData &&
    couponData.map((coupon) => {
      return {
        code: coupon.couponCode,
        type: coupon.couponType,
        includes: coupon.couponFor.join(", "),
        discount: coupon.offerPercentage,
        description: coupon.couponDescription,
        expiry: formatDateTime(new Date(coupon.expiryDate)),
        limit: coupon.couponLimit,
      };
    });
  const customStyles = {
    rows: {
      style: {
        minHeight: "2rem",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        textAlign: "center",
      },
    },
  };
  const ExpandedComponent = ({ data }) => {
    return (
      <div className="coupon">
        <div className="left-column">
          <div className="coupon-code">
            <p>Code:</p> {data.code}
          </div>
          <div className="coupon-type">
            <p>Type:</p> {data.type}
          </div>
          <div className="coupon-discount">
            <p>Discount: </p>
            {data.discount}%
          </div>
          <div className="coupon-limit">
            <p>Limit: </p>
            {data.limit}
          </div>
        </div>
        <div className="right-column">
          <div className="coupon-includes">
            <p>Applicable for:</p> {data.includes}
          </div>
          <div className="coupon-expiry">
            <p>Expiry:</p> {data.expiry}
          </div>
          <div className="coupon-description">
            <p>Description:</p> {data.description}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover={true}
        customStyles={customStyles}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: max-content;
  align-self: center;
  & > *::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0.5rem;
    }
  }
`;

export default CoupenTable;
