import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./modules/app/App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
