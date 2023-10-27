import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container>
      <img src={`/assets/about-image.jpg`}></img>
      <h1>Don&apos;t squeeze in a van when you could relax in a sedan.</h1>
      <div className="about">
        <div className="description">
          <p>
            Our mission is to enliven your road trip with the perfect travel car
            rental. Our cars are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p>
            Our team is full of roamnova enthusiasts who know firsthand the
            magic of touring the world on 4 wheels.
          </p>
        </div>
        <div className="explore">
          <h3>Your destination is waiting. Your car is ready.</h3>
          <Link className="secondary-button" to="/cars">
            Explore our cars
          </Link>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  img {
    width: 100%;
    height: 25rem;
  }
  & > h1 {
    margin: 1rem;
    line-height: 2rem;
  }
  .about {
    display: flex;
    margin: 0 1rem;
    gap: 2rem;
    .description {
      p {
        font-size: 1rem;
        text-align: justify;
      }
    }
    .explore {
      display: flex;
      flex-direction: column;
      color: white;
      padding: 1rem;
      margin-bottom: 1rem;
      gap: 0.5rem;
      border-radius: 0.25rem;
      background-color: rgb(40, 167, 69);
      h3 {
        line-height: 1.5rem;
      }
    }
  }
  @media screen and (max-width: 820px) {
    align-items: center;
    .about {
      gap: 1rem;
      flex-direction: column;
    }
  }
`;
export default About;
