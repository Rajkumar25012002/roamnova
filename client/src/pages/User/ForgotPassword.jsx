import React, { useState } from "react";
import styled from "styled-components";
import { forgotPassword } from "../../utils/HandleAPI/ForgorPassswordAPI";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionSuccess,
  toastOptionError,
} from "../../utils/functions/toastOptions";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword({
      email: email,
    });
    if (result.status === true) {
      const template = {
        user_name: result.data.name,
        linkToReset: `https://roamnova.netlify.app/resetpassword?token=${result.data.token}`,
        to_mail: result.data.email,
      };
      emailjs.send(
        "service_hwtked1",
        "template_70618lt",
        template,
        "wdQ8CmjSao4bhUoN3"
      );
      toast.success(result.message, toastOptionSuccess);
      setEmail("");
      navigate("/login");
    }
    if (result.status === false) {
      toast.error(result.message, toastOptionError);
    }
  };
  return (
    <Container>
      <div className="forgot-form">
        <h1>Password Recovery</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="primary-button" type="submit">
            Send Request
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
export default ForgotPassword;
