import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getCars, getCarStatus } from "../../features/carSlice";
import { getAllRentCarDetails } from "../../features/rentalCarSlice";
import SingleCarCard from "./Components/CarDisplayCard";
import FilterCar from "./Components/CarFilter";
import { SearchContext } from "../../App";
import { useContext } from "react";
import formatDateTime from "../../utils/functions/formatDateTime";
import CarCardSkeleton from "./Skeletons/CarCardSkeleton";
const Cars = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [isEdit, setIsEdit] = useState(false);
  const getAllRentedCars = useSelector(getAllRentCarDetails);
  const carData = useSelector(getCars);
  const carStatus = useSelector(getCarStatus);
  const availableCars =
    searchQuery.startDate && searchQuery.endDate
      ? carData.filter((car) => {
          return getAllRentedCars.every((rentedCar) => {
            if (car.carId === rentedCar.rentedCarId) {
              const res =
                new Date(rentedCar.pickUpDate) >
                  new Date(searchQuery.endDate) ||
                new Date(rentedCar.dropDate) < new Date(searchQuery.startDate);
              return res;
            } else {
              return true;
            }
          });
        })
      : carData;

  const [sortBy, setSortBy] = useState("Sort By");
  const [selectedFilters, setSelectedFilters] = useState({
    "Car type": [],
    "Fuel type": [],
    "Gear type": [],
    Price: [],
    "Air Condition": [],
  });
  const options = [
    { value: "Sort By", label: "Sort By" },
    { value: "Recent", label: "Recent" },
    { value: "Price(Low to High)", label: "Price(Low to High)" },
    { value: "Price(High to Low)", label: "Price(High to Low)" },
    { value: "Highest Ratings", label: "Highest Ratings" },
    { value: "Most Rented", label: "Most Rented" },
  ];
  const [showFilters, setShowFilters] = useState(false);
  const [searchCar, setSearchCar] = useState("");
  let n = Object.values(selectedFilters).reduce((x, y) => {
    return y.length > 0 ? x + 1 : x;
  }, 0);
  const filtersAppliedCars = availableCars.filter((car) => {
    return (
      (!searchCar ||
        car.carName.toLowerCase().includes(searchCar.trim().toLowerCase())) &&
      (selectedFilters["Car type"].length === 0 ||
        selectedFilters["Car type"].includes(car.carCategory)) &&
      (selectedFilters["Fuel type"].length === 0 ||
        selectedFilters["Fuel type"].includes(car?.additionalInfo?.fuelType)) &&
      (selectedFilters["Gear type"].length === 0 ||
        selectedFilters["Gear type"].includes(car?.additionalInfo?.gearType)) &&
      (selectedFilters["Price"].length === 0 ||
        selectedFilters["Price"].includes(car.carRent)) &&
      (selectedFilters["Air Condition"].length === 0 ||
        selectedFilters["Air Condition"].includes(car?.additionalInfo?.ac))
    );
  });
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleShowFilter = () => {
    setShowFilters(!showFilters);
  };
  const filteredCars = filtersAppliedCars.sort((a, b) => {
    if (sortBy === "Recent") {
      return new Date(b.carLastUpdatedOn) - new Date(a.carLastUpdatedOn);
    } else if (sortBy === "Price(Low to High)") {
      return Number(a.carRent) - Number(b.carRent);
    } else if (sortBy === "Price(High to Low)") {
      return Number(b.carRent) - Number(a.carRent);
    } else if (sortBy === "Highest Ratings") {
      return (
        (b.carReviews.reduce((c, d) => d.ratings + c, 0) /
          b.carReviews.length || 0) -
        (a.carReviews.reduce((c, d) => d.ratings + c, 0) /
          a.carReviews.length || 0)
      );
    } else if (sortBy === "Most Rented") {
      const rentedCountA = getAllRentedCars.reduce(
        (c, d) => (d.rentedCarId === a.carId ? c + 1 : c),
        0
      );
      const rentedCountB = getAllRentedCars.reduce(
        (c, d) => (d.rentedCarId === b.carId ? c + 1 : c),
        0
      );
      return rentedCountB - rentedCountA;
    }
    return a.carName.localeCompare(b.carName);
  });
  const displayCars =
    filteredCars.length > 0 ? (
      filteredCars.map((value, index) => {
        return <SingleCarCard key={index} value={value} />;
      })
    ) : (
      <p className="no-cars">No cars available</p>
    );
  const handleClearFilter = () => {
    setSelectedFilters({
      "Car type": [],
      "Fuel type": [],
      "Gear type": [],
      Price: [],
      "Air Condition": [],
    });
  };
  return (
    <Container>
      {searchQuery.startDate && searchQuery.endDate && (
        <div className="date-change">
          <label>
            <p className="label">Pickup DateTime</p>
            {!isEdit ? (
              <p>{formatDateTime(new Date(searchQuery?.startDate))}</p>
            ) : (
              <input
                type="datetime-local"
                name="startDate"
                placeholder="Start Date"
                value={searchQuery.startDate}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, startDate: e.target.value })
                }
              ></input>
            )}
          </label>
          <label>
            <p className="label">Drop DateTime</p>
            {!isEdit ? (
              <p>{formatDateTime(new Date(searchQuery?.endDate))}</p>
            ) : (
              <input
                type="datetime-local"
                name="endDate"
                placeholder="End Date"
                value={searchQuery.endDate}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, endDate: e.target.value })
                }
              ></input>
            )}
          </label>
          {isEdit && (
            <label>
              <input
                type="checkbox"
                checked={searchQuery.isDriver}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, isDriver: e.target.checked })
                }
              ></input>
              <p>Need a driver?</p>
            </label>
          )}
          {!isEdit ? (
            <button className="positive-button" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button onClick={handleEdit} className="positive-button">
              Save
            </button>
          )}
        </div>
      )}
      <span className="heading">
        <h2>Explore our car options</h2>
        <h2>(Available cars-{filteredCars.length || 0})</h2>
      </span>
      <div className="car-search">
        <input
          type="text"
          placeholder="Search for cars..."
          value={searchCar}
          className="search"
          onChange={(e) => setSearchCar(e.target.value.replace(/\s+/g, " "))}
        ></input>
        <Select
          className="sort"
          options={options}
          onChange={(e) => setSortBy(e.value)}
        />
      </div>
      <button className="primary-button" onClick={handleShowFilter}>
        Show filters
      </button>
      <div className="car-filter">
        <div className="filter-relative">
          <FilterCar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            handleShowFilter={handleShowFilter}
            handleClearFilter={handleClearFilter}
            n={n}
          />
        </div>
        {showFilters && (
          <div className="filter-absolute">
            <FilterCar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              handleShowFilter={handleShowFilter}
              handleClearFilter={handleClearFilter}
              n={n}
            />
          </div>
        )}
        <div className="car-display">
          {carStatus === "pending" ? (
            <CarCardSkeleton value={4} />
          ) : (
            displayCars
          )}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  .date-change {
    display: flex;
    align-self: center;
    flex-wrap: wrap;
    padding: 0.5rem;
    border: 1px solid #ccc;
    max-width: max-content;
    align-items: center;
    border-radius: 0.25rem;
    gap: 1rem;
    & > label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .label {
        font-weight: 600;
      }
    }
  }
  .heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
  }
  .car-search {
    display: flex;
    align-self: center;
    align-items: center;
    gap: 0.5rem;
    .search {
      width: 35rem;
    }
    .sort {
      width: 10rem;
    }
  }
  & > button {
    display: none;
  }
  .car-filter {
    display: flex;
    gap: 1rem;

    .filter-relative {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .filter-absolute {
      display: none;
      flex-direction: column;
      gap: 1rem;
    }
    .car-display {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      width: 100vw;
      height: max-content;
      .no-cars{
        margin: 5rem 5rem 0 0;
      }
    }
  }
  @media screen and (max-width: 785px) {
    .date-change {
      width: auto;
    }
    .car-search {
      flex-direction: column;
      .search {
        width: 20rem;
      }
    }
    & > button {
      display: block;
      align-self: flex-start;
      position: relative;
      border-right: none;
      padding: 0.2rem;
      border-radius: 0;
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        right: -11.3px;
        border-width: 13.575px 0 12px 12px;
        border-style: solid;
        border-color: rgb(40, 167, 69);
        border-color: transparent transparent transparent rgb(40, 167, 69);
      }
    }
    .apply-filters {
      display: block;
      align-self: center;
    }
    .car-filter {
      .filter-relative {
        display: none;
      }
      .filter-absolute {
        display: block;
        position: absolute;
        top: 5rem;
        left: 0;
      }
      .car-display {
        height: auto;
      }
    }
  }
`;
export default Cars;
