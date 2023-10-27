import axios from "axios";
import { URL } from "../Routes";
export async function forgotPassword({ email }) {
  const res = await axios.post(`${URL}/user/forgotPassword`, {
    email,
  });
  return res.data;
}
export async function resetPassword({ password, token }) {
  
  const res = await axios.post(`${URL}/user/resetPassword`, {
    password,
    token,
  });
  return res.data;
}
