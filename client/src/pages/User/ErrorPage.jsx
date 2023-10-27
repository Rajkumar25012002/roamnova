import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container>
      <div className="container">
        <div className="error-code">404</div>
        <div className="error-message">
          Oops! The page you're looking for doesn't exist.
        </div>
        <p>
          It seems like you've reached a dead end. Here are a few things you can
          try:
        </p>
        <ul>
          <li>Check the URL for typos and try again.</li>
          <li>
            Go back to the <Link href="/">homepage</Link>.
          </li>
        </ul>
        <div className="back-button">
          <Link to="/" className="button">
            Go to Home Page
          </Link>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: auto;
  .container {
    padding: 50px;
  }
  .error-code {
    font-size: 5rem;
    color: #e74c3c;
  }
  .error-message {
    font-size: 1.5rem;
    color: #333;
    margin-top: 20px;
  }
  .back-button {
    margin-top: 20px;
    a {
      color: #4d4d4d;
      font-size: 1.125rem;
      font-weight: 500;
      transition: 0.3s ease-in-out;
    }
    & > a:hover {
      font-size: 1.125rem;
      font-weight: 600;
      color: black;
    }
  }
`;
export default ErrorPage;
