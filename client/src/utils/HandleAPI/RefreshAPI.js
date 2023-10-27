import { URL } from "../Routes";
export default async function getTokenAPI() {
  const res = await fetch(`${URL}/user/refreshToken`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
