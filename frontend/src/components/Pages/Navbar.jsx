import React from "react";
import { FaChevronDown } from "react-icons/fa";
//import '../../assets/css/navbar.css'
import { FiBell, FiGlobe, FiSend, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div data-bs-page="navbar">
      <header className="d-flex d-sm-flex d-md-block">
        <nav className="navbar navbar-expand p-2 nav1">
          <div className="container-fluid d-flex">
            <ul className="navbar-nav me-auto" id="ul1">
              <li className="nav-item" title="Welcome to Pixora">
                <a
                  style={{ cursor: "pointer" }}
                  /* onClick={location.reload()} */
                  className="nav-link nav-brand p-0 m-0"
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
                </a>
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
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#cookies"
                        data-bs-toggle="modal"
                      >
                        collections
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
                      <a href="dashboard.php" className="dropdown-item">
                        featured artists
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#language"
                        data-bs-toggle="modal"
                      >
                        top photographers
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
                    Menu <FaChevronDown />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a onClick={() => navigate(`/${user.username}/myphotos`)} style={{cursor:"pointer"}} className="dropdown-item">
                        my photos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#language"
                        data-bs-toggle="modal"
                      >
                        site language
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dropdown-item"
                        data-bs-target="#cookies"
                        data-bs-toggle="modal"
                      >
                        cookies
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        data-bs-target="#about"
                        data-bs-toggle="tab"
                        className="dropdown-item"
                      >
                        contact us
                      </a>
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
            <ul className="navbar-nav d-none d-md-flex" id="ul2">
              <li className="nav-item">
                <a href="#" className="nav-link" title="Notifications">
                  <FiSend />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" title="Notifications">
                  <FiBell />
                </a>
              </li>
              <li className="nav-item" id="upload_button">
                <button
                  onClick={() => navigate("/upload")}
                  className="nav-link"
                  title="Upload your photo"
                >
                  <FiUpload /> Upload
                </button>
              </li>
              {user?.id ? (
                <div>
                  <img
                    src={user.profile_picture?`/profile_pictures/${user.profile_picture}`:`/outils/pngs/useracc2.png`}
                    width="40px"
                    height="auto"
                    alt="Useraccount"
                    id="imgAcc"
                    title="My profil"
                    onClick={() => navigate(`/${user.username}/myprofile`)}
                  />
                </div>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                      title="Login"
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => navigate("/signup")}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                      id="signup"
                      title="Signu up"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div
          className="modal fade"
          id="cookies"
          aria-hidden="true"
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1>Cookies</h1>
              </div>
              <div className="modal-body">
                <div>
                  <p>
                    We use cookies to enhance your experience on <u>Pixora</u>,
                    provide personalized content, and ensure the best
                    performance of our website. By continuing to browse, you
                    agree to our&nbsp;use&nbsp;of&nbsp;cookies.
                  </p>
                  <a href="cookies.php" className="btn" id="acceptButton">
                    Accept
                  </a>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-close" data-bs-dismiss="modal" />
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn d-md-none ms-auto"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDg"
          aria-controls="offcanvasDg"
          id="offcanvasButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width={40}
            height={40}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx={32}
              cy={32}
              r={29}
              stroke="currentColor"
              opacity="0.2"
            />
            <path d="M20 24h24" />
            <path d="M20 32h24" />
            <path d="M20 40h24" />
            <circle cx={48} cy={32} r={3} fill="currentColor" />
          </svg>
        </button>
        <div
          className="offcanvas offcanvas-end d-md-flex"
          tabIndex={-1}
          id="offcanvasDg"
          aria-labelledby="offcanvasDg"
        >
          <div className="offcanvas-header d-flex justify-content-between">
            <img
              src="outils/pngs/logo_styled.png"
              alt="logo"
              width="100px"
              height="auto"
              title="Welcome to DeluxeUpload"
              id="logo"
            />
            <img
              src="outils/pngs/useracc.png"
              alt="logo"
              width="40px"
              height="auto"
              id="imgAcc"
              title="My Account"
              /* onclick="window.open('dasheboard.php','_self')" */
            />
          </div>
          <div className="container-fluid">
            <button
              id="btnClose"
              type="button"
              className="btn mt-2 mb-2 w-100 text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Hide Bar
            </button>
          </div>
          <div className="offcanvas-body p-0">
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="For you"
              >
                <i className="fas fa-heart" /> for you
              </a>
              <a
                href="myprofil.php"
                className="list-group-item list-group-item-action"
                title="My profile"
              >
                <i className="fas fa-user" /> my profile
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="Site Language"
                data-bs-target="#language"
                data-bs-toggle="modal"
              >
                <i className="fas fa-language" /> Language
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="About"
              >
                <i className="fas fa-info-circle" /> about
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="Setting"
              >
                <i className="fas fa-palette" /> theme
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="Setting"
              >
                <i className="fas fa-language" /> site language
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                style={{ color: "red" }}
                title="For you"
              >
                <i className="fas fa-right-from-bracket" /> logout
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                title="For you"
              >
                <i className="fas fa-user-plus" /> create new account
              </a>
              <button
                type="button"
                className="btn"
                role="button"
                id="login"
                /* onclick="switchTo('login')" */
              >
                login
              </button>
              <button
                type="button"
                className="btn"
                role="button"
                id="signupButton"
                /* onclick="switchTo('signup')" */
              >
                signup
              </button>
            </div>
          </div>
        </div>
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
