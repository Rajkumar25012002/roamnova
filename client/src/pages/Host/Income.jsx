import React, { useState } from "react";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserDetailsById,
  getUserStatus,
} from "../../features/userSlice";
import { getCarIdListByOwnerId } from "../../features/carSlice";
import {
  getRentCarsByCarId,
  getRentCarStatus,
} from "../../features/rentalCarSlice";
import formatDateTime from "../../utils/functions/formatDateTime";
import { MonthlyIncome } from "./Components/IncomeCharts";
import { IncomeByCar } from "./Components/IncomeCharts";
import TransactionSkeleton from "./Skeletons/TransactionSkeleton";
import Select from "react-select";

const Income = () => {
  const [selectedChart, setSelectedChart] = useState("MonthlyIncome");
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const rentStatus = useSelector(getRentCarStatus);
  const userStatus = useSelector(getUserStatus);
  const carIdList = useSelector((state) =>
    getCarIdListByOwnerId(state, currentUserId)
  );
  let ownerCarInRentList = useSelector((state) =>
    getRentCarsByCarId(state, carIdList).filter(
      (car) => new Date(car.dropDate) < new Date()
    )
  );
  const totalIncome =
    ownerCarInRentList &&
    ownerCarInRentList
      .filter((car) => new Date(car.dropDate) < new Date())
      .reduce((sum, car) => sum + Number(car.rentalAmount), 0);

  const TransactionCard = ({ value }) => {
    const customerName = useSelector(
      (state) => getUserDetailsById(state, value?.customerId).fullName
    );
    return (
      <>
        <div className="single-transaction">
          <div className="transaction-info">
            <span className="customer">
              <BiUserCircle size={25} />
              <p>{customerName}</p>
            </span>
            <p className="date">{formatDateTime(new Date(value?.rentedOn))}</p>
          </div>
          <p className="amount">
            {Number(value?.rentalAmount).toLocaleString("hi-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
      </>
    );
  };
  const displayValue =
    ownerCarInRentList.length > 0 ? (
      ownerCarInRentList.map((value, index) => {
        return <TransactionCard value={value} key={index} />;
      })
    ) : (
      <p className="no-transaction">No Transactions made</p>
    );
  return (
    <Container>
      <h2>Your Income</h2>
      <p>
        Total Income :
        {totalIncome.toLocaleString("hi-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
        })}
      </p>
      <span className="select-chart">
        <p>View By</p>
        <Select
          className="select"
          options={[
            { value: "MonthlyIncome", label: "Monthly Income" },
            { value: "IncomeByCar", label: "Income By Car" },
          ]}
          onChange={(e) => setSelectedChart(e.value)}
          value={{
            value: selectedChart,
            label: selectedChart,
          }}
        />
      </span>
      <div className="main-container">
        <div className="graph">
          <div className="chart">
            {selectedChart === "MonthlyIncome" && <MonthlyIncome />}
            {selectedChart === "IncomeByCar" && <IncomeByCar />}
          </div>
        </div>
        <div className="transactions">
          <h3>Your transactions ({ownerCarInRentList.length})</h3>
          {rentStatus === "pending" || userStatus === "pending" ? (
            <TransactionSkeleton value={2} />
          ) : (
            displayValue
          )}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  overflow-y: hidden;
  .no-transaction {
    text-align: center;
  }
  .select-chart {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .select {
      width: 10rem;
    }
  }
  .main-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .transactions {
      display: flex;
      height: auto;
      flex-direction: column;
      overflow-y: auto;
      gap: 0.5rem;
      &::-webkit-scrollbar {
        width: 0.25rem;
        &-thumb {
          background-color: rgb(72, 71, 71);
          border-radius: 1rem;
        }
      }
      & > .single-transaction:nth-child(odd) {
        background-color: #e9e9e9;
      }
      .single-transaction {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        margin: 0 0.5rem;
        border-radius: 0.25rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        background-color: white;
        .transaction-info {
          .date {
            color: #4d4d4d;
            font-size: small;
          }
          .customer {
            display: flex;
            align-items: center;
          }
        }
        .amount {
          font-size: 1.25rem;
          font-weight: 600;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    .main-container {
      flex-direction: row;
      .graph,
      .transactions {
        width: 50%;
        height: 25rem;
      }
      .graph {
        .chart {
          height: 20rem;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;
export default Income;
