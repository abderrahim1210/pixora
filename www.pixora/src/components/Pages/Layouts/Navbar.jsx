import React from "react";
import { FaChevronDown } from "react-icons/fa";
//import '../../assets/css/navbar.css'
import { FiBell, FiGlobe, FiSend, FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Avatar from "../Avatar";
import OffcanvasTemplate from "../OffcanvasTemplate";
export const Navbar = ({type}) => {
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
                      <a href="dashboard.php" className="dropdown-item">
                        popular photos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#language"
                        data-bs-toggle="modal"
                      >
                        new &amp; trending
                      </a>
                    </li>
                    
                    <li>
                      <a
                        href="#about"
                        data-bs-target="#about"
                        data-bs-toggle="tab"
                        className="dropdown-item"
                      >
                        categories
                      </a>
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
                      <a onClick={() => navigate(`/user/${user.username}/myphotos`)} style={{cursor:"pointer"}} className={`dropdown-item ${(user?.role === "admin" || user?.role === "editor") && "disabled"}`}>
                        my photos
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
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#about"
                        data-bs-toggle="tab"
                        title="About"
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle dropdownIcon"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    title="Menu"
                  >
                    <FiGlobe /> <FaChevronDown />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a href="dashboard.php" className="dropdown-item">
                        English
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#language"
                        data-bs-toggle="modal"
                      >
                        Arabic
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav d-none d-md-flex" id="ul2-1">
              <li className="nav-item" id="upload_button">
                <button
                  onClick={() => navigate("/upload")}
                  className={`nav-link ${user && (user?.role === "admin" || user?.role === "editor") && "disabled"}`}
                  title="Upload your photo"
                >
                  <FiUpload /> Upload
                </button>
              </li>
              {user?.id ? (
                <Link to={`/user/${user?.username}/myprofile`}>
                  <Avatar src={`https://api.pixora.test/storage/profile_pictures/${user.photo_profile}`} size={40} />
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
        <OffcanvasTemplate user={user} />
      </header>
      <div
        className="modal fade"
        id="language"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1>Site Language</h1>
            </div>
            <div className="modal-body">
              <div>
                <select name="" id="language" className="form-select">
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
