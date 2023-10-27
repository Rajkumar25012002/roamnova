import pkg from "jsonwebtoken";
const { sign } = pkg;

export const createAccesToken = (userId, userRole) => {
  return sign({ userId, userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};
export const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
export const sendAccessToken = (res, req, accessToken) => {
  res.send({
    accessToken,
    message: "Your account has been logged in successfully",
    status: true,
  });
};
export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/user/refreshToken",
    sameSite: "none",
    secure:true
  });
};
