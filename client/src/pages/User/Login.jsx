import styled from "styled-components";
import { Link, Form } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../utils/functions/toastOptions";
import { useNavigate } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice";
import loginAPI from "../../utils/HandleAPI/LoginAPI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../features/userSlice";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const userName = formData.get("userName");
  const password = formData.get("password");
  try {
    const data = await loginAPI({
      userName,
      password,
    });
    if (data.status === true) {
      toast.success(data.message, toastOptionSuccess);
      return data;
    } else {
      toast.error(data.message, toastOptionError);
    }
  } catch (err) {
    toast.error("Somthing went on,try again !", toastOptionError);
  }
  return null;
};

const Login = () => {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector(getCurrentUser)
  if (data?.accessToken) {
    dispatch(setCurrentUser(data.accessToken));
    navigate("/");
  }
  useEffect(()=>{
    if(user?.accessToken){
      navigate("/")
    }
  },[user,navigate])
  return (
    <Container>
      <div className="login-form">
        <h1>Sign in to your account</h1>
        <Form method="POST" replace>
          <input type="text" name="userName" id="user_name"placeholder="Username"></input>
          <input type="password" name="password"id="password" placeholder="Password"></input>
          <button className="primary-button" type="submit">
            Sign in
          </button>
        </Form>
        <span>
          Don&apos;t have an account?<Link to="/register">Sign up</Link>
        </span>
        <Link to="/forgotpassword">Forgot Password?Click here</Link>
      </div>
      <ToastContainer />
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
  .login-form {
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
    & > span {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      & > a {
        color: green;
      }
    }
    & > a {
        color: green;
      }
  }
`;
export default Login;
