import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../App";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../features/userSlice";
const HomePage = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleFindCars = (e) => {
    e.preventDefault();
    navigate(`/cars`);
  };
  return (
    <Container>
      <div className="background-image"></div>
      <h1>You got the travel plans,we got the cars.</h1>
      <p>
        Add adventure to your life by joining the #roamnova movement. Rent the
        perfect car to make your perfect road trip.
      </p>
      <form onSubmit={handleFindCars}>
        <label>
          <p>Pick-up DateTime </p>
          <input
            type="datetime-local"
            name="startDate"
            id="start_date"
            placeholder="Start Date"
            value={searchQuery.startDate}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, startDate: e.target.value })
            }
          ></input>
        </label>
        <label>
          <p>Drop-off DateTime </p>
          <input
            type="datetime-local"
            name="endDate"
            id="end_date"
            placeholder="End Date"
            value={searchQuery.endDate}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, endDate: e.target.value })
            }
          ></input>
        </label>
        <span className="need-driver">
          <input
            type="checkbox"
            id="driver"
            name="isDriver"
            checked={searchQuery.isDriver}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, isDriver: e.target.checked })
            }
          ></input>
          <p>Need a driver?</p>
        </span>
        <button type="submit" className="primary-button">
          Find your cars
        </button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  height: 75vh;
  text-align: justify;
  padding: 0.5rem;
  h1,
  p {
    color: white;
  }
  .background-image {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: url("/assets/background.jpg") no-repeat center / cover;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
    gap: 1rem;
    & > label {
      display: flex;
      gap: 0.5rem;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .need-driver {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
  @media screen and (max-width: 500px) {
    h1 {
      line-height: 3rem;
    }
    form {
      label {
        gap: 0.5rem;
        flex-direction: column;
      }
    }
  }
`;
export default HomePage;
