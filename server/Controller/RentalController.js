import rentalCollection from "../Model/RentalModel.js";
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

export const addRentDetails = async (req, res) => {
  const {
    rentalAmount,
    rentedCarId,
    customerId,
    totalDays,
    pickUpDate,
    dropDate,
    isDriver,
    couponCode,
  } = req.body;
  const rentalId = nanoid();
  const rentalObj = {
    rentalId,
    rentedCarId,
    customerId,
    rentedOn: new Date(),
    totalDays,
    pickUpDate,
    dropDate,
    rentalAmount,
    isDriver,
    couponCode,
  };
  try {
    const result = await rentalCollection.insertMany([rentalObj]);
    res.send({
      data: result,
      message: "Your have rented car successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't rent cars",
    });
  }
};

export const getAllRentDetails = async (req, res) => {
  try {
    const result = await rentalCollection.find({}, { _id: 0, _v: 0 });
    res.send({
      data: result,
      message: "Your have rented car successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't rent cars",
    });
  }
};
export const cancelRentedCar = async (req, res) => {
  const { rentalId } = req.body;
  try {
    const rental = await rentalCollection.findOne({ rentalId: rentalId });

    if (!rental) {
      return res.status(404).send({ error: "Rental not found" });
    }
    await rentalCollection.findOneAndRemove({ rentalId: rentalId });

    res.send({
      data: rentalId,
      status: true,
      message: "Rental successfully canceled",
    });
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Internal server error",
        message: "Can't cancel booking",
      });
  }
};
