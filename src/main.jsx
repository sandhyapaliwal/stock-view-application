//call app
import React from "react";
import ReactDOM from "react-dom/client";//react-dom/client is modern api
import App from "./App";
import "./index.css";
import "@fontsource/inter";// Loads the Inter font (a clean, modern font).

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>{/*Wraps the app in StrictMode to enable extra checks during development.Helps catch bugs like deprecated methods or unsafe lifecycle methods.*/}
    <App />{/*parent of all components */}
  </React.StrictMode>
);
