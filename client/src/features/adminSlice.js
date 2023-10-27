import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/Routes";
export const addCoupen = createAsyncThunk(
  "admin/addCoupen",
  async (details) => {
    try {
      const result = await axios.post(`${URL}/admin/addCoupen`, details);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const addHostRequest = createAsyncThunk(
  "admin/addHostRequest",
  async (details) => {
    try {
      const result = await axios.post(`${URL}/admin/addHostRequest`, details);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllDetails = createAsyncThunk(
  "admin/getAllDetails",
  async () => {
    try {
      const result = await axios.get(`${URL}/admin/getAllData`);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const acceptHostRequest = createAsyncThunk(
  "admin/acceptHostRequest",
  async (detail) => {
    try {
      const result = await axios.post(`${URL}/admin/acceptHostRequest`, detail);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
const initialState = {
  adminData: {},
  status: "idle",
  err: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDetails.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.adminData = action.payload;
    });
    builder.addCase(getAllDetails.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(addCoupen.fulfilled, (state, action) => {
      state.status = "fulfilled";
      return {
        ...state,
        adminData: { ...state.adminData, coupons: action.payload },
      };
    });
    builder.addCase(addCoupen.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(addHostRequest.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedData = {
        ...state.adminData,
        hostRequests: [...state.adminData.hostRequests, action.payload],
      };
      return {
        ...state,
        adminData: updatedData,
      };
    });
    builder.addCase(addHostRequest.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(acceptHostRequest.fulfilled, (state, action) => {
      state.status = "fulfilled";
      return {
        ...state,
        adminData: { ...state.adminData, hostRequests: action.payload },
      };
    });
    builder.addCase(acceptHostRequest.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
  },
});
export const getAdminDataStatus = (state) => state.adminData.status;
export const getAdminDataErr = (state) => state.adminData.err;
export const getHostRequestDetails = (state) =>
  state.adminData.adminData.hostRequests;
export const getCouponDetails = (state) => state.adminData.adminData.coupons;
export default adminSlice.reducer;
