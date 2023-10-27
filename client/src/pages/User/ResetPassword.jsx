import React, { useState } from "react";
import styled from "styled-components";
import { resetPassword } from "../../utils/HandleAPI/ForgorPassswordAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionSuccess,
  toastOptionError,
} from "../../utils/functions/toastOptions";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const token = url.searchParams.get("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptionError);
      return;
    }
    const result = await resetPassword({
      token: token,
      password: password,
    });
    if (result.status === true) {
      toast.success(result.message, toastOptionSuccess);
      navigate("/login");
    }
    if (result.status === false) {
      toast.error(result.message, toastOptionError);
    }
  };
  return (
    <Container>
      <div className="forgot-form">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          ></input>
          <input
            type="password"
            name="confirmPassword"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          ></input>
          <button className="primary-button" type="submit">
            Reset
          </button>
        </form>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  justify-content: center;
  height: 77.2vh;
  background: url("/assets/login-background.png") no-repeat center / cover;
  .forgot-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
    & > form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
      & > button {
        width: 100%;
      }
    }
  }
`;
export default ResetPassword;
