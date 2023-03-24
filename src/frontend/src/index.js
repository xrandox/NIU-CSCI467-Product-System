/**
 * This file is the frontend index
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App";
import { InventoryContextProvider } from "./context/InventoryContext";

// If user has already logged in on this computer, we can just grab their token
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </React.StrictMode>
);
