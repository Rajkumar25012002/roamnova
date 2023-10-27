import React from "react";
import styled from "styled-components";

function DashBoard() {
  return <Container>DashBoard</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  height: 100%;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: center;
`;

export default DashBoard;
