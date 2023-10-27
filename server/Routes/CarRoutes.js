import express from "express";
import { addCar,getAllCars,updateCar ,addReview,deleteCar} from "../Controller/CarController.js";
const carRouter = express.Router();
carRouter.post("/addHostCar", addCar);
carRouter.get("/getAllCars", getAllCars);
carRouter.put("/updateCar", updateCar);
carRouter.post("/addReview", addReview);
carRouter.delete("/deleteCar", deleteCar);
export default carRouter;