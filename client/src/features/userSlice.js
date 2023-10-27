import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createSelector } from "@reduxjs/toolkit";
import { URL } from "../utils/Routes";
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const result = await axios.get(`${URL}/user/getAllUsers`);
    const data = result.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userData }) => {
    try {
      const result = await axios.post(`${URL}/user/updateUserInfo`, userData);
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const updateProfilePic = createAsyncThunk(
  "user/updateProfilePic",
  async ({ userId, profilePic }) => {
    try {
      const result = await axios.post(`${URL}/user/updateProfilePic`, {
        userId,
        profilePic,
      });
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const updateSavedCars = createAsyncThunk(
  "user/updateSavedCars",
  async ({ userId, carId }) => {
    try {
      const result = await axios.post(`${URL}/user/updateSavedCars`, {
        userId,
        carId,
      });
      const data = result.data;
      return data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
const initialState = {
  users: [],
  currentUser: null,
  status: "idle",
  err: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const userData = jwtDecode(action.payload);
      state.currentUser = {
        accessToken: action.payload,
        userRole: userData.userRole,
        userId: userData.userId,
      };
    },
    removeCurrentUser: (state) => {
      return {
        ...state,
        currentUser: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedUserState = state.users.map((user) =>
        user.userId === action.payload.userId ? action.payload : user
      );
      return {
        ...state,
        users: updatedUserState,
      };
    });
    builder.addCase(updateSavedCars.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedUserState = state.users.map((user) =>
        user.userId === action.payload.userId ? action.payload : user
      );
      return {
        ...state,
        users: updatedUserState,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedUserState = state.users.map((user) =>
        user.userId === action.payload.userId ? action.payload : user
      );
      return {
        ...state,
        users: updatedUserState,
      };
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      state.status = "rejected";
      state.err = action.error.message;
    });
  },
});

export const selectAllUsers = (state) => state.user.users;
export const getUserDetailsById = createSelector(
  [selectAllUsers, (_, userId) => userId],
  (users, userId) => {
    return users.find((user) => user.userId === userId);
  }
);
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.err;
export const getCurrentUser = (state) => state.user.currentUser;
export const getUserNameById = createSelector(
  [selectAllUsers, (_, userIdFromToken) => userIdFromToken],
  (users, userIdFromToken) => {
    return users.find((user) => user.userId === userIdFromToken)?.userName;
  }
);
export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export default userSlice.reducer;
