import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {HelmetProvider} from 'react-helmet-async';
createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </>
);
