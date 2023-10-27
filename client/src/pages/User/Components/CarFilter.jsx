import React from "react";
import styled from "styled-components";
import { AiFillCloseSquare } from "react-icons/ai";
import Data from "../../../data/data.json";
import CheckBox from "../Components/CarFilterCheckBox";

const FilterCar = ({
  handleShowFilter,
  selectedFilters,
  setSelectedFilters,
  handleClearFilter,
  n,
}) => {
  const filters = Data.filters;
  return (
    <Container>
      <span className="header">
        <h4>Filter Section</h4>
        <AiFillCloseSquare
          size={25}
          className="close"
          onClick={handleShowFilter}
        />
      </span>
      <span>
        <p>{` ${n} filters applied. `}</p>
        <button className="primary-button" onClick={handleClearFilter}>
          Clear all
        </button>
      </span>
      {filters.map((value, index) => {
        return (
          <div key={index}>
            <div className="line"></div>
            <CheckBox
              key={index}
              value={value}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
        );
      })}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  width: 15rem;
  border-radius: 0.25rem;
  background-color: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close {
      display: none;
      align-self: flex-end;
      color: red;
      @media screen and (max-width: 785px) {
        display: block;
      }
    }
  }
  & > span {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > button {
      padding: 0.25rem;
      background-color: transparent;
      color: green;
      text-decoration: underline;
    }
  }
  .line {
    height: 1px;
    background-color: rgb(218, 218, 218);
  }
`;
export default FilterCar;
