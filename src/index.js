import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
