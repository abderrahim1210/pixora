import React from "react";
import { Copyright } from "../Copyright";
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
//import '../../assets/css/footer.css'
export const Footer = ({ type }) => {
  const user = useAuth();
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
                    <Link to={'/'}>Home</Link>
                    <Link to={'/upload'}>Upload</Link>
                    <Link to={'/galleries'}>Galleries</Link>
                  </div>
                  <div className="footer-col">
                    <h4>Profile</h4>
                    {
                      (user?.role !== 'editor' && !user?.role !== 'admin') && (<Link to={`/user/${user?.username}/dashboard`}>Dashboard</Link>)
                    }
                    <Link to={`/user/${user?.username}/myprofile`}>Profile</Link>
                    <Link to={'/signup'}>Create account</Link>
                  </div>
                  <div className="footer-col">
                    <h4>Legal</h4>
                    <Link to={'/legal/privacy'}>Privacy</Link>
                    <Link to={'/legal/terms'}>Terms of use</Link>
                    <Link to={'/legal/cookies'}>Cookies</Link>
                  </div>

                  <div className="footer-col">
                    <h4>Follow us</h4>
                    <div className="socials">
                      <a href=""><FiFacebook /></a>
                      <a href=""><FiInstagram /></a>
                      <a href=""><FiTwitter /></a>
                      <a href="https://github.com/abderrahim1210"><FiGithub /></a>
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
            <footer className="footer ftr-dash">
              <div className="footer-container">
                <div className="footer-links">
                  <Link to={'/legal/terms'}>Terms of use</Link>
                  <span className="divider">•</span>
                  <Link to={'/legal/privacy'}>Privacy & Conditions</Link>
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
