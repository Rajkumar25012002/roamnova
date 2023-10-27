import express from "express";
import {
  addCoupen,
  acceptHostRequest,
  getAllData,
  addHostRequest
} from "../Controller/AdminController.js";
const adminRouter = express.Router();

adminRouter.post("/addCoupen", addCoupen);
adminRouter.post("/acceptHostRequest", acceptHostRequest);
adminRouter.get("/getAllData", getAllData);
adminRouter.post("/addHostRequest", addHostRequest);

export default adminRouter;
