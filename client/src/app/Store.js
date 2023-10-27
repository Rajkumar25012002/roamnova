import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";
import CarReducer from "../features/carSlice";
import RentCarReducer from "../features/rentalCarSlice";
import AdminData from "../features/adminSlice";
const store = configureStore({
  reducer: {
    car: CarReducer,
    user: UserReducer,
    rentCar: RentCarReducer,
    adminData: AdminData,
  },
});
export default store;
