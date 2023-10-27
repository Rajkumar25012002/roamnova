import axios from "axios";
import { URL } from "../Routes";
export default async function logoutAPI() {
  const res = await axios.post(
    `${URL}/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
}
