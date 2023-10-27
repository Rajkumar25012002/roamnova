import React from "react";
import styled from "styled-components";

const AdditionalSection = ({
  formData,
  handleInputChange,
  fuels,
  gears,
  ac,
}) => {
  return (
    <Container>
      <div className="additional-section">
        <input
          type="Number"
          placeholder="Enter no of seats"
          value={formData?.seats}
          name="seats"
          min={4}
          onChange={handleInputChange}
        />
        <input
          type="Number"
          placeholder="Enter current mileage in km/ltr"
          name="averageMileage"
          value={formData?.averageMileage}
          onChange={handleInputChange}
        />
        <select
          name="fuelType"
          value={formData?.fuelType}
          onChange={handleInputChange}
        >
          <option value="">Choose a fuel type</option>
          {fuels.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="gearType"
          value={formData?.gearType}
          onChange={handleInputChange}
        >
          <option value="">Choose a gear type</option>
          {gears.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select name="ac" value={formData?.ac} onChange={handleInputChange}>
          <option value="">Choose AC option</option>
          {ac.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  .additional-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 20rem;
    align-self: center;
  }
`;
export default AdditionalSection;
