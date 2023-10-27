import React from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { MdAddBox } from "react-icons/md";

const HostPage = () => {
  return (
    <Container>
      <nav>
        <NavLink to="." end="true">
          DashBoard
        </NavLink>
        <NavLink to="income">Income</NavLink>
        <NavLink to="cars">Cars</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
        <NavLink to="addcar">
          <MdAddBox />
        </NavLink>
      </nav>
      <Outlet />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  nav {
    display: flex;
    padding: 1rem;
    align-self: center;
    gap: 0.75rem;
    a {
      display: flex;
      align-items: center;
      color: #4d4d4d;
      font-size: 1.2rem;
      transition: 0.2s ease-out;
    }
    & > a:hover,
    .active {
      text-decoration: underline;
      color: rgb(40, 167, 69);
    }
  }
`;
export default HostPage;
