import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const tailWindColors = [
  "bg-red-100",
  "bg-red-300",
  "bg-blue-100",
  "bg-blue-300",
  "bg-green-100",
  "bg-green-300",
  "bg-gray-100",
  "bg-gray-300",
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
