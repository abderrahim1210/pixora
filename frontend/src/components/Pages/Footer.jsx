import React from "react";
import { Copyright } from "./Copyright";
//import '../../assets/css/footer.css'
export const Footer = () => {
  return (
    <div data-bs-page="footer">
      <footer>
        <div className="container-fluid d-flex justify-content-center">
          <h3 className="mt-2">Pixora</h3>
        </div>
        <div className="container-fluid navFot">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                EN
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                AR
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                FR
              </a>
            </li>
          </ul>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <mark id="quote_1">Pixora — Where&nbsp;pixels&nbsp;speak.</mark>
        </div>
        <div className="container-fluid navFot">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Privacy &amp; Policy
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Terms Of Use
              </a>
            </li>
          </ul>
        </div>
        <Copyright />
      </footer>
    </div>
  );
};
