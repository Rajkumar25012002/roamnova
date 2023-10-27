import carCollection from "../Model/CarModel.js";
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

export const addCar = async (req, res) => {
  const {
    carName,
    carCategory,
    carDescription,
    carModel,
    seats,
    fuelType,
    gearType,
    averageMileage,
    ac,
    carRent,
    carPhotos,
    carNumber,
  } = req.body;
  try {
    const data = {
      carId: nanoid(),
      userId: "sS6QwKkDj_qyJ3q0c_Pdq",
      carName: carName,
      carCategory: carCategory,
      carPostedOn: new Date(),
      carLastUpdatedOn: new Date(),
      carDescription: carDescription,
      additionalInfo: {
        carModel: carModel,
        seats: seats,
        fuelType: fuelType,
        gearType: gearType,
        averageMileage: averageMileage,
        ac: ac,
      },
      carRent: carRent,
      carPhotos: carPhotos,
      carNumber: carNumber,
    };
    const result = await carCollection.insertMany([data]);
    res.send({
      data: result,
      message: "Your car has been added successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't add cars",
    });
  }
};
export const updateCar = async (req, res) => {
  const {
    carId,
    userId,
    carName,
    carCategory,
    carDescription,
    carModel,
    seats,
    fuelType,
    gearType,
    carPostedOn,
    averageMileage,
    ac,
    carRent,
    carPhotos,
    carNumber,
  } = req.body;
  try {
    const data = {
      carId,
      userId,
      carName,
      carCategory,
      carPostedOn,
      carLastUpdatedOn: new Date(),
      carDescription,
      additionalInfo: {
        carModel,
        seats,
        fuelType,
        gearType,
        averageMileage,
        ac,
      },
      carRent,
      carPhotos,
      carNumber,
    };
    const result = await carCollection.findOneAndUpdate(
      { carId },
      { $set: data },
      { returnDocument: "after" }
    );
    res.send({
      data: result,
      message: "Your car has been updated successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't update cars",
    });
  }
};
export const getAllCars = async (req, res) => {
  try {
    const carData = await carCollection
      .find({}, { _id: 0, _v: 0, additionalInfo: { _id: 0 } })
      // .sort({ carLastUpdatedOn: -1 });
    res.send(carData);
  } catch (err) {
    res.status(400).send({
      error: "Bad Request",
      message: "Can't get cars",
    });
  }
};
export const addReview = async (req, res) => {
  const { userId, comments, ratings, rentalId, carId } = req.body;
  try {
    const data = {
      userId: userId,
      comments: comments,
      ratings: ratings,
      reviewedOn: new Date(),
      rentalId,
    };
    const carIdExists = await carCollection.findOne({ carId });
    if (carIdExists) {
      const result = await carCollection.findOneAndUpdate(
        { carId },
        { $push: { carReviews: data } },
        { returnDocument: "after" }
      );
      res.send({
        data: result,
        message: "Your review has been added successfully",
        status: true,
      });
    } else {
      res.status(400).send({
        error: "Something went wrong",
        message: "Can't find car",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't add review",
    });
  }
};
export const deleteCar = async (req, res) => {
  const { carId } = req.body;
  try {
    const result = await carCollection.deleteOne({ carId });
    res.send({
      data: carId,
      message: "Your car has been deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't delete car",
    });
  }
}
