import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/Routes";
export const addHostCar = createAsyncThunk(
  "car/addHostCar",
  async ({ carDetails }) => {
    try {
      const result = await axios.post(`${URL}/car/addHostCar`, carDetails);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const updateCar = createAsyncThunk(
  "car/updateCar",
  async ({ carDetails }) => {
    try {
      const result = await axios.put(`${URL}/car/updateCar`, carDetails);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async ({ carId }) => {
    try {
      const result = await axios.delete(`${URL}/car/deleteCar`);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const addReview = createAsyncThunk(
  "car/addReview",
  async ({ userId, comments, ratings, carId ,rentalId}) => {
    try {
      const result = await axios.post(`${URL}/car/addReview`, {
        userId,
        comments,
        ratings,
        carId,
        rentalId
      });
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllCars = createAsyncThunk("car/getAllCars", async () => {
  try {
    const result = await axios.get(`${URL}/car/getAllCars`);
    const data = result.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
const initialState = {
  hostCars: [],
  status: "idle",
  err: null,
};
const carSlice = createSlice({
  name: "hostCars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addHostCar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedCars = state.hostCars.concat(action.payload);
      return {
        ...state,
        hostCars: updatedCars,
      };
    });
    builder.addCase(addHostCar.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(getAllCars.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllCars.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.hostCars = action.payload;
    });
    builder.addCase(getAllCars.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { carId } = action.payload;
      const updatedCar = state.hostCars.map((Car) =>
        Car.carId === carId ? action.payload : Car
      );
      return {
        ...state,
        hostCars: updatedCar,
      };
    });
    builder.addCase(updateCar.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { carId } = action.payload;
      const updatedCar = state.hostCars.map((Car) =>
        Car.carId === carId ? action.payload : Car
      );
      return {
        ...state,
        hostCars: updatedCar,
      };
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { carId } = action.payload;
      const updatedCar = state.hostCars.filter((Car) => Car.carId !== carId);
      return {
        ...state,
        hostCars: updatedCar,
      };
    });
    builder.addCase(deleteCar.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
  },
});
export const getCarStatus = (state) => state.car.status;
export const getCarErr = (state) => state.car.err;
export const getCars = (state) => state.car.hostCars;
export const getCarDetailsById = createSelector(
  [getCars, (_, id) => id],
  (hostCars, id) => {
    return hostCars.find((car) => car.carId === id);
  }
);
export const getCarListByOwnerId = createSelector(
  [getCars, (state, id) => id],
  (hostCars, id) => {
    return hostCars.filter((car) => car.userId === id);
  }
);
export const getCarIdListByOwnerId = createSelector(
  [getCars, (state, id) => id],
  (hostCars, id) => {
    return hostCars.filter((car) => car.userId === id).map((car) => car.carId);
  }
);
export const getCarNameListByOwnerId = createSelector(
  [getCars, (state, id) => id],
  (hostCars, id) => {
    return hostCars
      .filter((car) => car.userId === id)
      .map((car) => car.carName);
  }
);
export default carSlice.reducer;
