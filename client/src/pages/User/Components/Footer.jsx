import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <footer>
        <p>Copywrite &copy; 2023 RoamNova.All Rights reserved.</p>
      </footer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  background-color: rgb(0, 0, 0, 0.7);
  color: white;
  text-align: center;
`;
export default Footer;
