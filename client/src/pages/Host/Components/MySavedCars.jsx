import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCarDetailsById } from "../../../features/carSlice";
import SingleCarCard from "../../User/Components/CarDisplayCard";
import CarDisplaySkeleton from "../../User/Skeletons/CarCardSkeleton";
const MySavedCars = () => {
  const { userDetails } = useOutletContext();
  const SavedCars=(value)=>{
    const savedCarDetails = useSelector((state) =>
    getCarDetailsById(state, value)
  );
  return (
    <div >
      {savedCarDetails == undefined ? (
        <CarDisplaySkeleton value={1}  />
      ) : (
        <SingleCarCard value={savedCarDetails} />
      )}
    </div>
  );
  }
  return (
    <SavedCarContainer>
      <div className="saved-car">
        <h3>MY SAVED CARS</h3>
        <div className="saved-car-display">
          {userDetails?.savedCars &&
            userDetails.savedCars.map((value, index) => {
             <SavedCars key={index} value={value.carId} />
            })}
          {userDetails?.savedCars && <p style={{ margin: "5rem" }}>No Saved Cars</p>}
        </div>
      </div>
    </SavedCarContainer>
  );
};
const SavedCarContainer = styled.div`
  .saved-car {
    display: flex;
    flex-direction: column;
    & > h3 {
      align-self: center;
    }
    .saved-car-display {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  }
`;
export default MySavedCars;
