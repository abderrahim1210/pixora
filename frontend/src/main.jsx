import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/css/signup_login.css";
import "./assets/css/navbar.css";
import "./assets/css/pixora.css";
import "./assets/css/footer.css";
import "./assets/css/dashboard.css";
//import "./assets/css/upload.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
