import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./app/Store.js";
import { Provider } from "react-redux";
import { getAllUsers } from "./features/userSlice";
import { getAllCars } from "./features/carSlice.js";
import { getAllRentCars } from "./features/rentalCarSlice.js";
import { getAllDetails } from "./features/adminSlice.js";
store.dispatch(getAllUsers());
store.dispatch(getAllCars());
store.dispatch(getAllRentCars());
store.dispatch(getAllDetails());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
