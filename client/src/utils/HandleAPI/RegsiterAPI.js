import axios from "axios";
import { URL } from "../Routes";
export default async function registerAPI({
  userName,
  password,
  email,
  fullName,
  phoneNumber,
  city,
  gender,
}) {
  const res = await axios.post(`${URL}/user/register`, {
    userName,
    fullName,
    password,
    email,
    phoneNumber,
    city,
    gender,
  });
  return res.data;
}
