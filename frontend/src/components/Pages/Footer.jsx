import React from "react";
import { Copyright } from "./Copyright";
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";
//import '../../assets/css/footer.css'
export const Footer = ({ type }) => {
  return (
    <>
      {
        type === "footer" && (
          <div data-bs-page="footer">
            <footer className="footer">
              <div className="container">
                <div className="footer-grid">
                  <div className="footer-col">
                    <h2 className="logo">Pixora</h2>
                    <p>Where pixels speak. Share and discover amazing visuals.</p>
                  </div>
                  <div className="footer-col">
                    <h4>Explore</h4>
                    <a href="#">Home</a>
                    <a href="#">Explore</a>
                    <a href="#">Upload</a>
                    <a href="#">Profile</a>
                  </div>
                  <div className="footer-col">
                    <h4>Legal</h4>
                    <a href="#">Privacy</a>
                    <a href="#">Terms of use</a>
                    <a href="#">Cookies</a>
                  </div>

                  <div className="footer-col">
                    <h4>Follow us</h4>
                    <div className="socials">
                      <a href=""><FiFacebook /></a>
                      <a href=""><FiInstagram /></a>
                      <a href=""><FiTwitter /></a>
                      <a href=""><FiGithub /></a>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <Copyright />
                </div>
              </div>
            </footer>
          </div>
        )
      }
      {
        type === "dash" && (
          <div data-bs-page="footer-dashboard">
            <footer className="footer">
              <div className="footer-container">
                <div className="footer-links">
                  <a href="#">Terms of use</a>
                  <span className="divider">•</span>
                  <a href="#">Privacy & Conditions</a>
                </div>

                <div className="footer-copy">
                  <Copyright />
                </div>
              </div>
            </footer>
          </div>
        )
      }
    </>
  );
};
