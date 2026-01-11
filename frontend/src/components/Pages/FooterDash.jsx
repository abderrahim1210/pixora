import React from "react";
import { Copyright } from "./Copyright";
export const FooterDash = () => {
  return (
    <div data-bs-page="footer-dashboard">
      <footer>
        <div className="ft">
          <nav className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Terms of use
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Privacy & conditons
              </a>
            </li>
          </nav>
          <div className="copyright">
            <Copyright />
          </div>
        </div>
      </footer>
    </div>
  );
};
