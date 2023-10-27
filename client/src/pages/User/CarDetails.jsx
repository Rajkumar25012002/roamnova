import { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { BsSpeedometer2, BsGearFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiSwanBreeze } from "react-icons/gi";
import { MdFreeCancellation } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getCarDetailsById } from "../../features/carSlice";
import PopCarousel from "./Components/PopCarousel";
import CancellationPolicy from "./Components/PopCarCancelPolicy";
import PriceSection from "./Components/PriceSection";
import { useContext } from "react";
import { SearchContext } from "../../App";
import CarDescriptionSkeleton from "./Skeletons/CarDescriptionSkeleton";
import Skeleton from "react-loading-skeleton";
import ReviewCard from "./Components/CarReviews";
import CarAddedBenefits from "./Components/CarAddedBenefits";

const CarDetails = () => {
  const [showImages, setShowImages] = useState(false);
  const { searchQuery } = useContext(SearchContext);
  const { id } = useParams();
  const value = useSelector((state) => getCarDetailsById(state, id));
  const [showPolicy, setShowPolicy] = useState(false);
  const handleCancellationPolicy = () => {
    setShowPolicy(!showPolicy);
  };
  const handlePopUp = () => {
    setShowImages(!showImages);
  };
  return (
    <Container>
      <Link to="/cars">
        <GoArrowLeft />
        Back to all cars
      </Link>
      <div className="main-container">
        <div className="single-car-description">
          {value === undefined ? (
            <CarDescriptionSkeleton value={1} />
          ) : (
            <div className="single-car">
              <div className="image">
                <img src={value?.carPhotos[0]}></img>
              </div>
              <div className="car-info">
                <span className="fuel-pick-category">
                  <p className="category">{value?.carCategory}</p>
                  <p className="fuel">{value?.additionalInfo?.fuelType}</p>
                  <p className="pick">Top Pick</p>
                </span>
                <p className="car-name">{value?.carName}</p>
                <span className="seat-gear">
                  <p className="seats">
                    <MdOutlineAirlineSeatReclineNormal />4 seats
                  </p>
                  <p className="gear">
                    <BsGearFill />
                    {`Gear-${value?.additionalInfo?.gearType}`}
                  </p>
                </span>
                <span className="mileage-ac">
                  <p className="mileage">
                    <BsSpeedometer2 />
                    {`${value?.additionalInfo?.averageMileage}kms/ltr`}
                  </p>
                  <p className="ac">
                    <GiSwanBreeze />
                    {value?.additionalInfo?.ac === "Yes"
                      ? "AC Conditioned"
                      : "Non-AC"}
                  </p>
                </span>
                <span className="price">
                  <p className="rent">
                    {Number(value?.carRent).toLocaleString("hi-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p>/day</p>
                </span>
                <button className="positive-button" onClick={handlePopUp}>
                  See more photos
                </button>
              </div>
            </div>
          )}
          <div className="description">
            {value === undefined ? (
              <Skeleton count={3} />
            ) : (
              <main>{value?.carDescription}</main>
            )}
          </div>
          <CarAddedBenefits />
          {value?.carReviews.length > 0 && (
            <div className="review-comments">
              <h2>Reviews</h2>
              <div className="comment-container">
                {value?.carReviews &&
                  value.carReviews.map((value, index) => {
                    return <ReviewCard {...value} key={index} />;
                  })}
              </div>
            </div>
          )}
          <div className="cancellation-policy">
            <span className="policy-header">
              <h3>Cancellation Policy</h3>
              <div onClick={handleCancellationPolicy} className="policy">
                <BiCopy />
                <p>View Policy</p>
              </div>
            </span>
            <span>
              <MdFreeCancellation />
              <h5>Free Cancellation</h5>
            </span>
            <p>Zero cancellation fee till 48 hours</p>
            <p>Quick refund after cancellation</p>
            {showPolicy && (
              <CancellationPolicy
                handleCancellationPolicy={handleCancellationPolicy}
              />
            )}
          </div>
        </div>
        {!searchQuery?.startDate && !searchQuery.endDate && (
          <div className="please-select">
            <img src="/assets/info-robo.png"></img>
            <p>
              Please select <Link to="/">dates</Link> for a deal
            </p>
          </div>
        )}
        {searchQuery?.startDate && searchQuery.endDate && (
          <PriceSection value={value} carType={value?.carCategory} />
        )}
        {showImages && (
          <PopCarousel
            value={value.carPhotos}
            carName={value.carName}
            handlePopUp={handlePopUp}
          />
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  a {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .main-container {
    display: flex;
    gap: 1rem;
    .single-car-description {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 3rem;
      padding: 0.5rem;
      height: 30rem;
      overflow-y: auto;
      border: 1px solid #afafaf;
      &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 1rem;
        }
      }
      .single-car {
        display: flex;
        gap: 2rem;
        .image {
          & > img {
            width: 20rem;
            object-fit: cover;
            border-radius: 0.25rem;
          }
        }
        .car-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          .fuel-pick-category {
            display: flex;
            & > * {
              color: rgb(139, 139, 139);
              border: 1px solid rgb(217, 217, 217);
              padding: 0 0.2rem;
              border-radius: 0.25rem;
            }
          }
          & > span {
            display: flex;
            gap: 1rem;
          }
          .car-name {
            font-size: 1.25rem;
            font-weight: 600;
          }
          .price {
            gap: 0;
            .rent {
              font-weight: 600;
            }
          }
        }
      }
      .description {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        & > main {
          text-align: justify;
        }
      }
      .review-comments {
        display: flex;
        flex-direction: column;
        .comment-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
      }
      .cancellation-policy {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        span {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          .policy {
            display: flex;
            gap: 0.5rem;
            cursor: pointer;
            align-items: center;
          }
        }
        p {
          color: #666666;
        }
      }
    }
    .please-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: flex-start;
      min-width: 15rem;
      text-align: center;
      color: #c88201;
      & > p {
        display: flex;
        gap: 0.25rem;
        & > a {
          text-decoration: underline;
          margin: 0 0.25rem;
        }
      }
      & > img {
        height: 15rem;
      }
    }
  }
  @media screen and (max-width: 785px) {
    .main-container {
      flex-direction: column;
      .single-car-description {
        height: auto;
        .single-car {
          flex-direction: column;
          .image {
            & > img {
              width: 18rem;
            }
          }
        }
        .description {
          .rent {
            align-self: center;
          }
        }
        .review-comments {
          .comment-container {
            justify-content: center;
          }
        }
      }
    }
  }
`;
export default CarDetails;
