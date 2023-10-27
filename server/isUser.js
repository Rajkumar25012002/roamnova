import pkg from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import ROLE from "./Roles.js";
export const isAuth = (req) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("You need to login");
  const token = authorization && authorization.split(" ")[1];
  if (token == null) return false;
  const { userid } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userid;
};
