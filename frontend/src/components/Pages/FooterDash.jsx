import React from "react";
import { Copyright } from "./Copyright";
export const FooterDash = () => {
  return (
    <div data-bs-page="footer-dashboard">
      <footer>
        <div class="ft">
          <nav class="nav">
            <li class="nav-item">
              <a href="#" class="nav-link">
                Terms of use
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
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
