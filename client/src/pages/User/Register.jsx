import React from "react";
import styled from "styled-components";
import { Link, redirect, Form } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../utils/functions/toastOptions";
import registerAPI from "../../utils/HandleAPI/RegsiterAPI";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const userName = formData.get("userName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const email = formData.get("email");
  const referralId = formData.get("referralId");
  if (password !== confirmPassword) {
    toast.error("Passwords do not match", toastOptionError);
    return null;
  }
  try {
    const data = await registerAPI({
      userName,
      password,
      email,
      referralId,
    });
    if (data.status === true) {
      toast.success(data.message, toastOptionSuccess);
      return redirect("/login");
    } else {
      toast.error(data.message, toastOptionError);
    }
  } catch (err) {
    toast.error("Somthing went on,try again !", toastOptionError);
  }

  return null;
};
const Register = () => {
  return (
    <Container>
      <div className="login-form">
        <h1>Sign up your account</h1>
        <Form method="POST" replace>
          <input
            type="text"
            name="userName"
            id="userName"
            required
            placeholder="Username"
          ></input>
          <input
            type="email"
            name="email"
            id="emails"
            required
            placeholder="Email"
          ></input>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
          ></input>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
          ></input>
          <input
            type="text"
            name="referralId"
            id="referralId"
            placeholder="Referral Id (optional)"
          ></input>
          <button className="primary-button" type="submit">
            Sign up
          </button>
        </Form>
        <span>
          Already have an account?<Link to="/login">Sign in</Link>
        </span>
      </div>
      <ToastContainer />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 81.4vh;
  background: url("/assets/login-background.png") no-repeat center / cover;
  .login-form {
    display: flex;
    flex-direction: column;
    align-self: center;
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
    & > span {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      & > a {
        color: green;
      }
    }
  }
`;
export default Register;
