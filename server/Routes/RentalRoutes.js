import express from "express";
import {
  addRentDetails,
  getAllRentDetails,
  cancelRentedCar
} from "../Controller/RentalController.js";
const rentalRouter = express.Router();
rentalRouter.post("/addCar", addRentDetails);
rentalRouter.get("/getCar", getAllRentDetails);
rentalRouter.post("/cancelRentedCar",cancelRentedCar)
export default rentalRouter;
