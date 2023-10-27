import userCollection from "../Model/UserModel.js";
import { nanoid } from "nanoid";
import {
  createAccesToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../token.js";
import "dotenv/config";
import pkg from "bcryptjs";
import pack from "jsonwebtoken";
import { isAuth } from "../isUser.js";
const { verify } = pack;
const { hash, compare } = pkg;

export const registerUser = async (req, res, next) => {
  const { userName, email, password, referralId } = req.body;
  try {
    const emailExists = await userCollection.findOne({ email: email });
    const userExists = await userCollection.findOne({ userName: userName });
    if (userExists) {
      res.send({
        message: "Username already exists!,try another username",
        status: false,
      });
    } else if (emailExists) {
      res.send({
        message: "Email already exists!,try another email",
        status: false,
      });
    } else {
      const hashedPassword = await hash(String(password), 10);
      const data = {
        userId: nanoid(),
        userName: userName,
        email: email,
        fullName: userName,
        password: hashedPassword,
        registerReferralId:nanoid(5),
        userReferralId:referralId,
        refreshToken: null,
      };
      await userCollection.insertMany([data]).then(() =>
        res.send({
          message: `Hi,${userName} your account has been created successfully`,
          status: true,
        })
      );
    }
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Cant register",
    });
  }
};
export const loginUser = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await userCollection.findOne({ userName: userName });
    if (user) {
      const valid = await compare(password, user.password);
      if (!valid) {
        return res.send({
          message: "Invalid Password!,try again",
          status: false,
        });
      }
      const accessToken = createAccesToken(user.userId, user.userRole);
      const refreshToken = createRefreshToken(user.userId);
      await userCollection.updateOne(
        { userId: user.userId },
        { $set: { refreshToken: refreshToken } }
      );
      sendRefreshToken(res, refreshToken);
      sendAccessToken(res, req, accessToken);
    } else {
      res.send({
        message: "Username not exists!,try to register",
        status: false,
      });
    }
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Cant login",
    });
  }
};
export const logoutUser = async (_req, res, _next) => {
  res.clearCookie("refreshToken", {
    path: "/user/refreshToken",
    sameSite: "none",
    secure: true,
  });
  return res.send({
    message: "Your account has been logged out successfully",
    status: true,
  });
};
export const refreshTokenForUser = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.send({ accessToken: null });
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return res.send({ accessToken: null });
    }
    const user = await userCollection.findOne({ userId: payload.userId });
    if (!user) return res.send({ accessToken: null });
    if (token !== user.refreshToken) {
      return res.send({ accessToken: null });
    }
    const accessToken = createAccesToken(user.userId, user.userRole);
    const refreshToken = createRefreshToken(user.userId);
    await userCollection.updateOne(
      { userId: user.userId },
      { $set: { refreshToken: refreshToken } }
    );
    sendRefreshToken(res, refreshToken);
    return res.send({
      accessToken,
    });
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Cant update refresh token",
    });
  }
};
export const isUserAuth = async (req, res, next) => {
  try {
    const userId = isAuth(req);
    if (userId !== null && userId) {
      next();
    } else {
      throw new Error("You aren't authorized to this page");
    }
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "You aren't authorized to this page",
    });
  }
};
export const getAllUsers = async (_req, res, next) => {
  try {
    const userData = await userCollection.find(
      {},
      {
        userName: 1,
        email: 1,
        fullName: 1,
        userId: 1,
        userRole: 1,
        email: 1,
        phoneNumber: 1,
        city: 1,
        userProfilePic: 1,
        income: 1,
        gender: 1,
        savedCars: 1,
        createdOn: 1,
        registerReferralId: 1,
        userReferralId:1
      }
    );
    res.send(userData);
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Can't get users",
    });
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const { userId, fullName, phoneNumber, email, gender, city } = req.body;
    {
      const userIdExists = await userCollection.findOne({
        userId: userId,
      });
      if (userIdExists) {
        const userData = await userCollection.findOneAndUpdate(
          { userId: userId },
          {
            $set: {
              fullName: fullName,
              email: email,
              city: city,
              gender: gender,
              phoneNumber: phoneNumber,
            },
          },
          { new: true }
        );
        res.send({ data: userData, status: true });
      } else {
        res.send({ message: "User not found", status: false });
      }
    }
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Can't update user",
    });
  }
};

export const updateProfilePic = async (req, res, next) => {
  try {
    const { userId, profilePic } = req.body;
    const userIdExists = await userCollection.findOne({
      userId: userId,
    });
    if (userIdExists) {
      const userData = await userCollection.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            userProfilePic: profilePic,
          },
        },
        { new: true }
      );
      res.send({ data: userData, status: true });
    } else {
      res.send({ message: "User not found", status: false });
    }
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Can't upload profile pic",
    });
  }
};
export const updateSavedCars = async (req, res, next) => {
  try {
    const { userId, carId } = req.body;
    const carIdExists = await userCollection.findOne({
      userId: userId,
      savedCars: {
        $in: [carId],
      },
    });
    let userData;
    if (carIdExists) {
      userData = await userCollection.findOneAndUpdate(
        { userId: userId },
        {
          $pull: {
            savedCars: carId,
          },
        },
        { new: true }
      );
    } else {
      userData = await userCollection.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            savedCars: carId,
          },
        },
        { new: true }
      );
    }
    res.send({ data: userData, status: true });
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Can't update user",
    });
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.send({
        data: "User not found",
        status: false,
      });
    } else {
      const token = nanoid();
      const result = await userCollection.updateOne(
        { email: email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordTokenExpires: Date.now() + 3600000,
          },
        },
        {
          new: true,
        }
      );
      res.send({
        data: { name: user.fullName, email: user.email, token: token },
        message: "Reset password link has been sent to your email",
        status: true,
      });
    }
  } catch (err) {
    res.status(400).send({
      data: "Bad Request",
      message: "Can't reset password",
      status: false,
    });
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const hashedPassword = await hash(String(password), 10);
    const result = await userCollection.updateOne(
      {
        resetPasswordToken: token,
        resetPasswordTokenExpires: { $gt: Date.now() },
      },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: "",
          resetPasswordTokenExpires: "",
        },
      }
    );
    res.send({
      message: "Password has been updated successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).send({
      message: "Can't reset password",
      status: false,
    });
  }
};
