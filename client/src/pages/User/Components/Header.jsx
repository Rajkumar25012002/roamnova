import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getUserDetailsById,
  getCurrentUser,
} from "../../../features/userSlice";
import ROLE from "../../../data/Roles";

const Header = () => {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const currentUserRole = useSelector(getCurrentUser)?.userRole;
  const userDetails = useSelector((state) =>
    getUserDetailsById(state, currentUserId)
  );
  const [toggle, setToggle] = useState(false);
  return (
    <Container>
      <header className="max-screen-header">
        <div className="logo">
          <NavLink to="/">
            ROAM<p>NOVA</p>
          </NavLink>
        </div>
        <div className="links">
          <NavLink to="/about">About</NavLink>
          {(currentUserRole === ROLE.ADMIN ||
            currentUserRole === ROLE.HOST) && (
            <NavLink to="/host">Host</NavLink>
          )}
          {currentUserId && <NavLink to="/cars">Cars</NavLink>}
          {currentUserRole === ROLE.ADMIN && (
            <NavLink to={`/admin/${currentUserId}`}>Admin</NavLink>
          )}
          {!currentUserId && <NavLink to="/login">Login</NavLink>}
          {!currentUserId && <NavLink to="/register">Register</NavLink>}
          {currentUserId && (
            <NavLink className="profile" to={`/user/${currentUserId}`}>
              <FaUserCircle />
              {userDetails?.userName}
            </NavLink>
          )}
          <AiOutlineMenu className="menu" onClick={() => setToggle(!toggle)} />
        </div>
      </header>
      {toggle && (
        <header className="min-screen-header">
          <div className="links">
            <NavLink onClick={() => setToggle(!toggle)} to="/about">
              About
            </NavLink>
            {(currentUserRole === ROLE.ADMIN ||
              currentUserRole === ROLE.HOST) && (
              <NavLink onClick={() => setToggle(!toggle)} to="/host">
                Host
              </NavLink>
            )}
            {currentUserId && (
              <NavLink onClick={() => setToggle(!toggle)} to="/cars">
                Cars
              </NavLink>
            )}
            {currentUserRole === ROLE.ADMIN && (
              <NavLink
                onClick={() => setToggle(!toggle)}
                to={`/admin/${currentUserId}`}
              >
                Admin
              </NavLink>
            )}
            {!currentUserId && (
              <NavLink onClick={() => setToggle(!toggle)} to="/login">
                Login
              </NavLink>
            )}
            {!currentUserId && (
              <NavLink onClick={() => setToggle(!toggle)} to="/register">
                Register
              </NavLink>
            )}
            {currentUserId && (
              <NavLink
                className="profile"
                onClick={() => setToggle(!toggle)}
                to={`/user/${currentUserId}`}
              >
                Profile
              </NavLink>
            )}
          </div>
        </header>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  .max-screen-header {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: space-between;
    align-items: center;
    * {
      color: white;
    }
    .logo {
      & > a {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        & > p {
          color: rgb(40, 167, 69);
        }
      }
    }
    .links {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      .menu {
        display: none;
      }
      .profile {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      & > a {
        font-size: 1.25rem;
      }
      & > a:hover,
      .active {
        color: rgb(40, 167, 69);
        border-bottom: 2px solid rgb(40, 167, 69);
      }
    }
  }
  .min-screen-header {
    display: none;
    z-index: 1;
    padding: 1rem;
    position: absolute;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    top: 5rem;
    right: 0;
    .links {
      display: flex;
      flex-direction: column;
      align-items: center;
      * {
        color: white;
      }
      & > a {
        font-size: 1.25rem;
        padding: 0.5rem 0;
      }
      & > a:hover,
      .active {
        border-bottom: 2px solid rgb(40, 167, 69);
      }
    }
  }
  @media screen and (max-width: 575px) {
    .max-screen-header {
      .links {
        .profile,
        a {
          display: none;
        }
        .menu {
          display: block;
        }
      }
    }
    .min-screen-header {
      display: flex;
    }
  }
`;
export default Header;
