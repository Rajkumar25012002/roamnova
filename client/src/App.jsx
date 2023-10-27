import "./App.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./pages/User/Layout/UserLayout";
import HomePage from "./pages/User/HomePage";
import About from "./pages/User/About";
import Login, { loginAction } from "./pages/User/Login";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import Register, { registerAction } from "./pages/User/Register";
import AdminHome from "./pages/Admin/AdminHome";
import AdminDashBoard from "./pages/Admin/Components/DashBoard";
import Coupen from "./pages/Admin/Components/Coupen";
import HostRequest from "./pages/Admin/Components/HostRequest";
import Cars from "./pages/User/Cars";
import CarDetails from "./pages/User/CarDetails";
import Profile from "./pages/User/Profile";
import HostPage from "./pages/Host/Layout/HostLayout";
import DashBoard from "./pages/Host/DashBoard";
import Income from "./pages/Host/Income";
import HostCars from "./pages/Host/CarsDisplay";
import Reviews from "./pages/Host/Reviews";
import HostCarAdd from "./pages/Host/AddCar";
import EditCarsDetails from "./pages/Host/EditCarDetails";
import HostCarDetails from "./pages/Host/CarDetails";
import CarInfo from "./pages/Host/Components/CarDetailsInfo";
import Photos from "./pages/Host/Components/CarDetailsPhotos";
import Price from "./pages/Host/Components/CarDetailsPrice";
import CarDelete from "./pages/Host/Components/CarDetailsDelete";
import RentCar from "./pages/User/Components/PopCarRentInfo";
import MyAccount from "./pages/Host/Components/MyAccount";
import MyBookings from "./pages/Host/Components/MyBookings";
import MySavedCars from "./pages/Host/Components/MySavedCars";
import ErrorPage from "./pages/User/ErrorPage";
import { createContext } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SearchContext = createContext();
function App() {
  const [searchQuery, setSearchQuery] = React.useState({
    startDate: "",
    endDate: "",
    isDriver: false,
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} action={loginAction} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="register" element={<Register />} action={registerAction} />
        <Route
          path="admin/:id"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashBoard />} />
          <Route path="coupen" element={<Coupen />} />
          <Route path="hostRequest" element={<HostRequest />} />
        </Route>
        <Route
          path="user/:id/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyAccount />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="savedCar" element={<MySavedCars />} />
        </Route>
        <Route
          path="cars"
          element={
            <ProtectedRoute>
              <Cars />
            </ProtectedRoute>
          }
        />
        <Route
          path="cars/:id"
          element={
            <ProtectedRoute>
              <CarDetails />
            </ProtectedRoute>
          }
        >
          <Route path="rentcar" element={<RentCar />} />
        </Route>
        <Route
          path="host"
          element={
            <ProtectedRoute>
              <HostPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="income" element={<Income />} />
          <Route path="cars">
            <Route index element={<HostCars />} />
            <Route path=":id" element={<HostCarDetails />}>
              <Route index element={<CarInfo />} />
              <Route path="price" element={<Price />} />
              <Route path="photos" element={<Photos />} />
              <Route path="edit" element={<EditCarsDetails />} />
              <Route path="delete" element={<CarDelete />} />
            </Route>
          </Route>
          <Route path="reviews" element={<Reviews />} />
          <Route path="addcar" element={<HostCarAdd />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#dadada">
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <RouterProvider router={router} />
      </SearchContext.Provider>
    </SkeletonTheme>
  );
}

export default App;
