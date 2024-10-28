import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Tegucigalpa")


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
);
