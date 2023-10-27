import React from "react";
import styled from "styled-components";
import Select from "react-select";
const GeneralSection = ({ formData, handleInputChange, category }) => {
  return (
    <Container>
      <div className="general-section">
        <input
          type="text"
          placeholder="Enter your car name"
          onChange={handleInputChange}
          value={formData?.carName}
          name="carName"
        />
        <input
          type="text"
          placeholder="Enter your car model"
          onChange={handleInputChange}
          value={formData?.carModel}
          name="carModel"
        />
        <input
          type="text"
          placeholder="Enter your car number"
          name="carNumber"
          value={formData?.carNumber}
          onChange={handleInputChange}
        />
        <select
          name="carCategory"
          value={formData?.carCategory}
          onChange={handleInputChange}
        >
          <option value="">Choose a category</option>
          {category.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Rent/day"
          onChange={handleInputChange}
          value={formData?.carRent}
          name="carRent"
        />
        <textarea
          type="text"
          placeholder="Car description"
          name="carDescription"
          onChange={handleInputChange}
          value={formData?.carDescription}
        ></textarea>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  .general-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-self: center;
    width: 20rem;
    & > textarea {
      height: 5rem;
      resize: none;
      &::-webkit-scrollbar {
        width: 0.25rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 0.5rem;
        }
      }
    }
  }
`;
export default GeneralSection;
