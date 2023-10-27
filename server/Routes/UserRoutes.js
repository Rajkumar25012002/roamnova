import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenForUser,
  isUserAuth,
  getAllUsers,
  updateUserInfo,
  updateSavedCars,
  updateProfilePic,
  resetPassword,
  forgotPassword,
} from "../Controller/UserController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/refreshToken", refreshTokenForUser);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/updateUserInfo", updateUserInfo);
userRouter.post("/updateSavedCars", updateSavedCars);
userRouter.post("/updateProfilePic", updateProfilePic);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/forgotPassword", forgotPassword);
export default userRouter;
