import React from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import Panel from "./Components/Panel";
function AdminHome() {
  return (
    <Container>
      <Panel />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  height: 34rem;
  & > *:nth-child(2) {
    flex: 1;
  }
  @media screen and (max-width: 710px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

export default AdminHome;
