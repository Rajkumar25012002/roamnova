import React from "react";
import styled from "styled-components";
import { MdPrivateConnectivity } from "react-icons/md";
import { TbCashBanknoteOff } from "react-icons/tb";
import { AiFillSafetyCertificate } from "react-icons/ai";
function CarAddedBenefits() {
  return (
    <Container>
      <div className="added-benefits">
        <h3>Added Benefits</h3>
        <div className="cards">
          <div className="card">
            <span>
              <AiFillSafetyCertificate />
              <h5>Safety First</h5>
            </span>
            <p>
              Our experts have rigorously examined this car through a 20-step
              safety check, ensuring a worry-free trip ahead!
            </p>
          </div>
          <div className="card">
            <span>
              <TbCashBanknoteOff />
              <h5>No Extra Target</h5>
            </span>
            <p>
              We've got you covered. No security deposit, unlimited kilometers,
              roadside help, and trip protection included
            </p>
          </div>
          <div className="card">
            <span>
              <MdPrivateConnectivity />
              <h5>100% Private</h5>
            </span>
            <p>
              Embrace a new way to travel and drive with freedom, flexibility,
              and your own space, just like your personal car!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .added-benefits {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      .card {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        border-radius: 0.25rem;
        padding: 0.5rem;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
        width: 15rem;
        & > span {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          color: rgb(40, 167, 69);
        }
        & > p {
          text-align: justify;
        }
      }
    }
  }
  @media screen and (max-width: 785px) {
    .added-benefits {
      .cards {
        justify-content: center;
      }
    }
  }
`;

export default CarAddedBenefits;
