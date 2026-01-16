import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  FaCamera,
  FaChartLine,
  FaFacebook,
  FaGlobe,
  FaHeart,
  FaIdCard,
  FaInstagram,
  FaLock,
  FaMapMarked,
  FaMoon,
  FaPaintBrush,
  FaTrash,
  FaTwitter,
  FaUpload,
  FaUserCog,
  FaUserPlus,
  FaUsers,
  FaUserSlash,
} from "react-icons/fa";
import {
  FaGear,
  FaMapLocation,
  FaMapPin,
  FaPencil,
  FaRightFromBracket,
  FaShieldHalved,
  FaWebAwesome,
  FaX,
} from "react-icons/fa6";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MdUpload } from "react-icons/md";
import { FiEye, FiTrash, FiUpload } from "react-icons/fi";
import { FooterDash } from "./FooterDash";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./Login";

export const MyProfile = (props) => {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [edit, setEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/myProfile.php", {
        withCredentials: true,
      })

      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setPhotos(res.data.photos);
        } else {
          navigate('/login');
        }
      });
    axios
      .get("http://localhost/Pixora/backend/api/statistics_profile.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setStatistics(res.data.data);
        }
      });
    axios.get("/json/countries.json").then((res) => res.data).then(data => setCountries(data));
  }, []);
  const show = props.modalState;
  const handleOpen = props.openModal;
  const handleClose = props.closeModal;
  const userCurr = props.data;
  function slugiFy(text){
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  return (
    <div data-bs-page="myprofile">
      <Navbar data={userCurr} />
      {show === "profilePicture" && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Body>
              <div>
                <ul className="list-group profile_settings p-0">
                  <li className="list-group-item">
                    <a href="#">
                      <FiUpload size={25} /> Upload profile picture
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="#" /* onclick="previewProfilePicture();" */>
                      <FiEye size={25} />
                      Preview profile picture
                    </a>
                  </li>
                  <li className="list-group-item deleteOption">
                    <form
                      action="delete_profile_picture.php"
                      id="delPhotoProfileForm"
                      method="post"
                    >
                      <a href="#" /* onclick="delProfilePhoto()" */>
                        <FiTrash size={25} /> Delete profile picture
                      </a>
                    </form>
                  </li>
                </ul>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      )}
      {show === "coverImage" && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Body>
              <div>
                <ul className="list-group profile_settings">
                  <li className="list-group-item">
                    <a
                      href="#"
                    /* onclick="document.getElementById('cover_file').click();" */
                    >
                      <i className="fas fa-upload" /> Upload cover picture
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="#" /* onclick="previewCoverPicture();" */>
                      <i className="fas fa-eye" /> Preview cover picture
                    </a>
                  </li>
                  <li className="list-group-item deleteOption">
                    <form
                      action="delete_cover_picture.php"
                      id="delPhotoCoverForm"
                      method="post"
                    >
                      <a href="#" /* onclick="delCoverPhoto()" */>
                        <i className="fas fa-trash" /> Delete cover picture
                      </a>
                    </form>
                  </li>
                </ul>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      )}
      <div className="profilePreview" style={{ display: "none" }}>
        <a href="profile_pictures/">
          <img src="profile_pictures/" />
        </a>
      </div>
      <div className="coverPreview" style={{ display: "none" }}>
        <a href="cover_images/">
          <img src="cover_images/" />
        </a>
      </div>
      <main>
        <div className="container-fluid">
          <div className="row div">
            <nav className="navbar navbar-expand nav2 sticky-top" id="demo">
              <div className="mx-auto">
                <ul className="nav">
                  <li className="nav-item">
                    <a
                      data-bs-target="#info"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      <FaIdCard /> personal informations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#editProfile"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <FaPencil /> edit profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#setting"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <FaGear /> settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#statistics"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <FaChartLine /> statistics
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="tab-content">
              <div className="mt-2 mb-2 tab-pane fade show active" id="info">
                <div
                  className="d-flex justify-content-start align-items-center mt-2 mb-3"
                  style={{ flexDirection: "column", gap: 5 }}
                >
                  <div className="container-fluid p-0 profileImages">
                    <div
                      className="coverImage"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        backgroundImage: user.cover_image
                          ? `url("/cover_images/${user.cover_image}")`
                          : `linear-gradient(135deg, #454545 0%, #353535 100%)`,
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="d-flex justify-content-center">
                        <form
                          action="up_cover_picture.php"
                          id="coverPictureForm"
                          method="post"
                          encType="multipart/form-data"
                        >
                          <input
                            type="file"
                            className="d-none"
                            name="coverFile"
                            id="cover_file"
                            accept=".png, .jpeg"
                          />
                        </form>
                        <FaCamera />
                      </div>
                    </div>
                    <div className="profileImage">
                      <form
                        action="up_profile_picture.php"
                        id="profilePictureForm"
                        method="post"
                        encType="multipart/form-data"
                      >
                        <input
                          type="file"
                          name="profileImage"
                          className="d-none"
                          id="profile_img"
                          accept=".png, .jpeg"
                        />
                      </form>
                      <img
                        src={
                          user.photo_profile
                            ? "/profile_pictures/" + user.photo_profile
                            : "/outils/pngs/useracc2.png"
                        }
                        onContextMenu={(e) => e.preventDefault()}
                        width="100px"
                        className="img_acc"
                        id="imgAcc"
                        alt=""
                        title="Your profile picture"
                      />
                    </div>
                  </div>
                </div>
                <div className="photo-info-card w-100">
                  <div className="information">
                    <div>
                      <h3 className="fw-semibold mb-1">{user?.displayname}</h3>
                    </div>
                    <div>
                      <p
                        className="mb-1 mx-auto"
                        style={{
                          textDecoration: "underline",
                          width: "max-content",
                          cursor: "pointer",
                        }}
                        data-bs-toggle="tooltip"
                        title="View in map"
                      >
                        <FaMapPin id="location_icon" />
                        {user?.country}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1">@{user?.email}</p>
                    </div>
                    <div>
                      <p>{user?.bio}</p>
                    </div>
                  </div>
                  <div className="container statistic_profile">
                    <div>{statistics.followers ?? 0} Followers</div>
                    <div>{statistics.followings ?? 0} Following</div>
                    <div>{statistics.likes ?? 0} Likes</div>
                    <div>{statistics.photosCount ?? 0} Photos</div>
                  </div>
                  <div className="social_media mt-2 mb-2">
                    {user.facebook && (
                      <div>
                        <a href="" id="facebookIcon">
                          <FaFacebook />
                        </a>
                      </div>
                    )}
                    {user.instagram && (
                      <div>
                        <a href="" id="instagramIcon">
                          <FaInstagram />
                        </a>
                      </div>
                    )}
                    {user.x && (
                      <div>
                        <a href="" id="xIcon">
                          <FaTwitter />
                        </a>
                      </div>
                    )}
                    {user.website && (
                      <div>
                        <a href="" id="webIcon">
                          <FaGlobe />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="container-fluid pm-button mt-3">
                    <Link to={`/${user.username}/myphotos`} className="btn" id="managePhotos">
                      manage my photos
                    </Link>
                  </div>
                  <div className="container-fluid">
                    <div className="myphotos mb-3">
                      {photos.length > 0 ? (
                        photos.map((p) => (
                          <div className="card" key={p.id}>
                            <div className="card-body p-0">
                              <div className="image">
                                <Link
                                  id="caption"
                                  style={{ cursor: "pointer" }}
                                  to={`/photo/${p.id}/${slugiFy(p.title)}`}
                                >
                                  <img src={`/photos/${p.filename}`} alt={p.title} onContextMenu={(e) => e.preventDefault()} />
                                </Link>
                              </div>
                              <div className="d-flex justify-content-between p-2">
                                <div>
                                  <h5>{p.title}</h5>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                  <div>
                                    <p>{p.visibility}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-content">
                          <div className="mb-5 d-flex justify-content-center align-items-center">
                            <FaCamera size={40} style={{ cursor: "pointer" }} />
                            <h4>No photos yet — start sharing your moments!</h4>
                          </div>
                        </div>
                      )}
                    </div>
                    <a href="#" style={{ textDecoration: "underline" }}>
                      Show more
                    </a>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="editProfile">
                <div className="card-info">
                  <div className="mt-5 mx-auto">
                    <input
                      type="file"
                      className="d-none"
                      name="profileImage"
                      id="profile_img"
                      accept=".png, .jpg"
                    />
                    <img
                      src={"/profile_pictures/" + user.photo_profile}
                      width="100px"
                      className="img_acc mt-2 mb-2"
                      id="imgAcc1"
                      alt=""
                      data-bs-toggle="tooltip"
                      title=""
                    />
                    <div className="d-flex justify-content-center align-items-center gap-3 text-center profile_actions mx-auto">
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpen("profilePicture")}
                      >
                        <FaPencil />
                      </a>
                      <a href="#">
                        <FaTrash />
                      </a>
                    </div>
                  </div>
                  <div id="edit_profile">
                    <h2 className="text-center fw-bold">Account center</h2>
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        type="button"
                        className="btn"
                        id="editInfos"
                        title="Edit"
                        onClick={() => setEdit(prev => !prev)}
                      >
                        <FaPencil size={15} />
                      </button>
                    </div>
                    <form
                      action="edit_profile.php"
                      id="editProfileForm"
                      method="post"
                    >
                      <input type="hidden" name="user_id" defaultValue="" />
                      <ul className="list-group">
                        {edit ? (
                          <div key={"edit"}>
                            <li className="list-group-item">
                              <strong>Username</strong>
                              <div className="edit-div">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="update_name"
                                  id="username"
                                  /* onKeyUp="checkName()" */
                                  defaultValue={user.username}
                                />
                                <span id="err_username" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Display name</strong>
                              <div className="edit-div">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="update_dname"
                                  /* onKeyUp="checkDname() */
                                  id="userdname"
                                  defaultValue={user.displayname}
                                />
                                <span id="err_dname" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Email</strong>
                              <div className="edit-div">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="update_email"
                                  id="useremail"
                                  /* onKeyUp="checkEmail() */
                                  defaultValue={user.email}
                                />
                                <span id="err_useremail" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Phone number</strong>
                              <div className="edit-div">
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="update_phone"
                                  /* onkeyup="checkPhone()" */
                                  id="userphone"
                                  defaultValue={user.phone_number}
                                />
                                <span id="err_userphone" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Bio</strong>
                              <div className="edit-div">
                                <textarea
                                  name="update_bio"
                                  id="bio"
                                  className="form-control"
                                  rows={1}
                                  defaultValue={user.bio}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Birthay</strong>
                              <div className="edit-div">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="update_birth"
                                  id="userbirth"
                                  defaultValue={user.birth_date}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Gender</strong>
                              <div className="edit-div">
                                <select
                                  className="form-control"
                                  name="update_gender"
                                  id="usergender"
                                >
                                  <option value={user.gender} disabled hidden>Choose gender</option>
                                  <option value="Male" >Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Country</strong>
                              <div className="edit-div">
                                <div>
                                  <select
                                    className="form-control"
                                    id="countrySelect"
                                  >
                                    <option value={user?.country}>{user?.country}</option>
                                    {
                                      countries.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                      ))
                                    }
                                  </select>
                                  <input
                                    type="hidden"
                                    name="update_location"
                                    id="selectedCountry"
                                    defaultValue={user.country}
                                  />
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Facebook</strong>
                              <div className="edit-div">
                                <textarea
                                  name="face_link"
                                  id="facebook"
                                  className="form-control"
                                  rows={1}
                                  /* onKeyUp="checkFace()" */
                                  defaultValue={user.facebook}
                                />
                                <span id="err_face" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Website</strong>
                              <div className="edit-div">
                                <textarea
                                  name="website_link"
                                  id="website"
                                  className="form-control"
                                  rows={1}
                                  /* onKeyUp="checkWebsite */
                                  defaultValue={user.website}
                                />
                                <span id="err_website" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>X</strong>
                              <div className="edit-div">
                                <textarea
                                  name="x_link"
                                  id="x"
                                  className="form-control"
                                  rows={1}
                                  /* onKeyUp="checkX()"
                                   */ defaultValue={user.x}
                                />
                                <span id="err_x" />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Instagram</strong>
                              <div className="edit-div">
                                <textarea
                                  name="insta_link"
                                  id="instagram"
                                  className="form-control"
                                  rows={1}
                                  /* onKeyUp="checkInsta() */
                                  defaultValue={user.instagram}
                                />
                                <span id="err_insta" />
                              </div>
                            </li>
                          </div>
                        ) : (
                          <div key={"View"}>
                            <li className="list-group-item">
                              <strong>Username</strong>
                              <div className="display-div">
                                <p>{user.username}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Display name</strong>
                              <div className="display-div">
                                <p>{user.displayname}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Email</strong>
                              <div className="display-div">
                                <p>{user.email}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Phone number</strong>
                              <div className="display-div">
                                <p>{user.phone_number}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Bio</strong>
                              <div className="display-div">
                                <p>{user.bio}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Birthay</strong>
                              <div className="display-div">
                                <p>{user.birth_date}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Gender</strong>
                              <div className="display-div">
                                <p>{user.gender}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Country</strong>
                              <div className="display-div">
                                <p>{user.country}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Facebook</strong>
                              <div className="display-div">
                                <p className="fc">{user.facebook}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Website</strong>
                              <div className="display-div">
                                <p className="wb">{user.website}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>X</strong>
                              <div className="display-div">
                                <p className="xLink">{user.x}</p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Instagram</strong>
                              <div className="display-div">
                                <p className="itgm">{user.instagram}</p>
                              </div>
                            </li>
                          </div>
                        )}
                      </ul>
                      <div className="d-flex justify-content-end align-items-center mb-2">
                        <button
                          type="reset"
                          className="btn tooltip-tab d-none"
                          id="resetInfos"
                          title="Reset all changes"
                        >
                          <i className="fas fa-sync" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 disabled"
                        id="saveChangeBtn"
                      >
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="setting">
                <section className="settings-page container mt-4 mb-5">
                  <h2>Setting</h2>
                  <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                      <FaUserCog className="me-2" />
                      Account
                    </h5>
                    <div className="setting-card">
                      <div className="setting-info">
                        <FaLock />
                        <div>
                          <h6>Change Email &amp; Password</h6>
                          <p>
                            Update your account email address or password
                            securely.
                          </p>
                        </div>
                      </div>
                      <a href="edit_account.php" className="btn btn-sm">
                        Edit
                      </a>
                    </div>
                  </div>
                  <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                      <FaPaintBrush className="me-2" />
                      Display &amp; Theme
                    </h5>
                    <div className="setting-card">
                      <div className="setting-info">
                        <FaMoon />
                        <div>
                          <h6>Theme</h6>
                          <p>Switch between light and dark mode.</p>
                        </div>
                      </div>
                      <button type="button" className="btn btn-sm">
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                      <FaShieldHalved className="me-2" />
                      Security
                    </h5>
                    <div className="setting-card">
                      <div className="setting-info">
                        <FaRightFromBracket />
                        <div>
                          <h6>Log out</h6>
                          <p>Sign out from your current session.</p>
                        </div>
                      </div>
                      <a href="logout.php" className="btn btn-sm">
                        Log out
                      </a>
                    </div>
                    <div className="setting-card text-danger">
                      <div className="setting-info">
                        <FaUserSlash />
                        <div>
                          <h6>Delete Account</h6>
                          <p>Permanently remove your account and all data.</p>
                        </div>
                      </div>
                      <button type="button" className="btn btn-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </section>
              </div>
              <div className="tab-pane fade show" id="statistics">
                <div className="mt-2 mb-2">
                  <h2>Statistics</h2>
                  <p>
                    Track your progress and see how your profile evolves over
                    time
                  </p>
                  <div className="stat-container">
                    <div className="stat-card">
                      <FaUserPlus />
                      <h3>Following</h3>
                      <p>{statistics.followings ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaHeart />
                      <h3>Likes</h3>
                      <p>{statistics.likes ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaUsers />
                      <h3>Followers</h3>
                      <p>{statistics.followers ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaCamera />
                      <h3>Photos</h3>
                      <p>{statistics.photosCount ?? 0}</p>
                    </div>
                  </div>
                  <div className="container statisticsGraph">
                    <canvas id="statisticsChart" height="auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterDash />
    </div>
  );
};
