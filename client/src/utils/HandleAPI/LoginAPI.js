import axios from "axios";
import { URL } from "../Routes";
export default async function loginAPI({ userName, password }) {
  const res = await axios.post(
    `${URL}/user/login`,
    {
      userName,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
}
