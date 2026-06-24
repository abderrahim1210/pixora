import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiBell, FiGlobe, FiSend, FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Avatar from "../Avatar";
import OffcanvasTemplate from "../Templates/OffcanvasTemplate";
import { Notification } from "../Notification";
export const Navbar = ({ type }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div data-bs-page="navbar">
      <header className="d-flex d-sm-flex d-md-block">
        <nav className="navbar navbar-expand p-2 nav1">
          <div className="container-fluid d-flex">
            <ul className="navbar-nav me-auto" id="ul1">
              <li className="nav-item" title="Welcome to Pixora">
                <Link
                  style={{ cursor: "pointer" }}
                  className="nav-link nav-brand p-0 m-0"
                  to={'/'}
                >
                  {
                    localStorage.getItem('theme') === 'light' ? (
                      <img
                        src="/outils/pngs/logo_styled.png"
                        style={{
                          padding: "0%",
                          width: 100,
                          height: "auto",
                          margin: 0,
                        }}
                        id="logo"
                      />
                    ) : (
                      <img
                        src="/outils/pngs/logo_dark.png"
                        style={{
                          padding: "0%",
                          width: 100,
                          height: "auto",
                          margin: 0,
                        }}
                        id="logo"
                      />
                    )
                  }
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav d-none d-md-flex me-auto" id="ul2">
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle dropdownIcon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Menu"
                  >
                    Discover <FaChevronDown />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to={'/search?type=popular'} className="dropdown-item">
                        popular photos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/search?type=trending'}
                        className="dropdown-item"
                      >
                        new &amp; trending
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    href="#about"
                    className="nav-link dropdown-toggle dropdownIcon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Menu"
                  >
                    Photographers <FaChevronDown />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to={'/photographers'} className={`dropdown-item ${type === 'all' ? 'active' : ''}`}>
                        all photographers
                      </Link>
                    </li>
                    <li>
                      <Link to={'/photographers?type=featured_artists'} className={`dropdown-item ${type === 'featured_artists' ? 'active' : ''}`}>
                        featured artists
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/photographers?type=top_photographers'}
                        className={`dropdown-item ${type === 'top_photographers' ? 'active' : ''}`}
                      >
                        top photographers
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle dropdownIcon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Menu"
                  >
                    Menu <FaChevronDown />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a onClick={() => navigate(`/user/${user.username}/dashboard`)} style={{ cursor: "pointer" }} className={`dropdown-item ${(user?.role === "admin" || user?.role === "editor") && "disabled"}`}>
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <Link
                        to={'/galleries'}
                        className="dropdown-item"
                      >
                        galleries
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav d-none d-md-flex" id="ul2-1">
              {
                user?.id && (
                  <Notification />
                )
              }
              {
                user?.id && (<li className="nav-item" id="upload_button">
                  <button
                    onClick={() => navigate("/upload")}
                    className={`nav-link ${user && (user?.role === "admin" || user?.role === "editor") && "disabled"}`}
                    title="Upload your photo"
                  >
                    <FiUpload /> Upload
                  </button>
                </li>)
              }
              {user?.id ? (
                <Link to={`/user/${user?.username}/myprofile`}>
                  <Avatar src={user.photo_profile} size={40} />
                </Link>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                      title="Login"
                      id="loginButton"
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => navigate("/signup")}
                      style={{ cursor: "pointer" }}
                      className="nav-link signup"
                      title="Signu up"
                      id="signupButton"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="d-flex align-items-center ms-auto d-md-none">
          {user?.id && (
            <div className="me-3">
              <Notification />
            </div>
          )}
          <OffcanvasTemplate user={user} />
        </div>
      </header>
    </div>
  );
};
