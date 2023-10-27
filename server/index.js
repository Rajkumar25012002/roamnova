import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/UserRoutes.js";
import carRouter from "./Routes/CarRoutes.js";
import rentalRouter from "./Routes/RentalRoutes.js";
import adminRouter from "./Routes/AdminRoutes.js";
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "https://roamnova.netlify.app",
    origin:"http://localhost:5173",
    credentials: true,
  })
);
const url = process.env.MONGO_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use("/user", userRouter);
app.use("/car", carRouter);
app.use("/rent", rentalRouter);
app.use("/admin", adminRouter);
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.info("Connected to database ");
  })
  .catch((err) => console.log(`Error connecting to the database.${err}`));

app.listen({ port: process.env.PORT }, () => {
  console.log(`server is running @ port ${process.env.PORT}`);
});
