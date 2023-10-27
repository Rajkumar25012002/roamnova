import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

const CheckBox = ({ value, selectedFilters, setSelectedFilters }) => {
  const [show, setShow] = useState(true);
  const handleCheckBox = (e) => {
    const exist = selectedFilters[value.filtername]?.includes(e.target.value);
    if (exist) {
      const removed = selectedFilters[value.filtername]?.filter(
        (key) => key !== e.target.value
      );
      setSelectedFilters((prevData) => ({
        ...prevData,
        [value.filtername]: removed,
      }));
    } else {
      setSelectedFilters((prevData) => ({
        ...prevData,
        [value.filtername]: [...prevData[value.filtername], e.target.value],
      }));
    }
  };
  return (
    <Container>
      <span className="filter">
        <p className="filter-type">{value.filtername}</p>
        {show && <FaAngleDown onClick={() => setShow(!show)} />}
        {!show && <FaAngleRight onClick={() => setShow(!show)} />}
      </span>
      {show &&
        value.types.map((type, index) => {
          return (
            <div className="checkvalue" key={index}>
              <input
                id="focus "
                type="checkbox"
                value={type.name}
                checked={selectedFilters[value.filtername]?.includes(type.name)}
                onChange={handleCheckBox}
              ></input>
              <p>{type.name}</p>
            </div>
          );
        })}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .filter-type {
      font-size: large;
      color: green;
    }
    & > svg {
      transition: 0.2s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .checkvalue {
    display: flex;
    gap: 0.25rem;
    color: rgb(85, 85, 85);
  }
`;
export default CheckBox;
