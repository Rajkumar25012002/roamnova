import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";
import { URL } from "../utils/Routes";
export const addRentCar = createAsyncThunk("rentCars/add", async (rentCar) => {
  try {
    const result = await axios.post(`${URL}/rent/addCar`, rentCar);
    const data = result.data;
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const getAllRentCars = createAsyncThunk("rentCars/getAll", async () => {
  try {
    const result = await axios.get(`${URL}/rent/getCar`);
    const data = result.data.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const cancelBooking=createAsyncThunk("rentCars/cancelBooking",async(rentalId)=>{
 
  try {
    const result = await axios.post(`${URL}/rent/cancelRentedCar`,{rentalId:rentalId});
    const data = result.data.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
})
const initialState = {
  rentCars: [],
  status: "idle",
  err: null,
};

const rentCarSlice = createSlice({
  name: "rentCars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRentCar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedCars = state.rentCars.concat(action.payload);
      return {
        ...state,
        rentCars: updatedCars,
      };
    });
    builder.addCase(addRentCar.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(getAllRentCars.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllRentCars.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    })
    builder.addCase(getAllRentCars.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.rentCars = action.payload;
    });
    builder.addCase(cancelBooking.fulfilled,(state,action)=>{
      state.status="fulfilled";
      const updatedRentedCars=state.rentCars.filter((car)=> car.rentalId!==action.payload)
      return{
        ...state,
        rentCars:updatedRentedCars
      }
    })
  },
});
export const getRentCarError = (state) => state.rentCar.err;
export const getRentCarStatus = (state) => state.rentCar.status;
export const getAllRentCarDetails = (state) => state.rentCar.rentCars;
export const getRentCarsByCustomerId = createSelector(
  [getAllRentCarDetails, (state, userId) => userId],
  (rentCars, userId) => {
    return rentCars.filter((car) => car.customerId === userId);
  }
);
export const getRentCarsByCarId = createSelector(
  [getAllRentCarDetails, (state, carIdList) => carIdList],
  (rentCars, carIdList) => {
    return rentCars.filter((car) => carIdList.includes(car.rentedCarId));
  }
);
export const getRentCarCountByCarId = createSelector(
  [getAllRentCarDetails, (state, carId) => carId],
  (rentCars, carId) => {
    return rentCars.reduce(
      (count, car) =>
        car.rentedCarId === carId && new Date(car.dropDate) < new Date()
          ? count + 1
          : count,
      0
    );
  }
);
export default rentCarSlice.reducer;
