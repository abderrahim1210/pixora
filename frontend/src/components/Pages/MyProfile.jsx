import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  FaCamera,
  FaChartLine,
  FaFacebook,
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
  FaX,
} from "react-icons/fa6";
import axios from "axios";
import { Tooltip } from "bootstrap";

export const MyProfile = () => {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/myProfile.php", {
        withCredentials: true,
      })

      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setPhotos(res.data.photos);
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
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((el) => new Tooltip(el));
  }, []);
  return (
    <>
      <Navbar data={user} />
      <div
        className="modal fade"
        id="profileSettings"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <ul className="list-group profile_settings">
                  <li className="list-group-item">
                    <a
                      href="#"
                      /* onclick="document.getElementById('profile_img').click();" */
                    >
                      <i className="fas fa-upload" /> Upload profile picture
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="#" /* onclick="previewProfilePicture();" */>
                      <i className="fas fa-eye" />
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
                        <i className="fas fa-trash" /> Delete profile picture
                      </a>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="coverSettings"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
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
            </div>
          </div>
        </div>
      </div>
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
                    <div>
                      <a href="" id="facebookIcon">
                        <FaFacebook />
                        {/* <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Facebook</title>
                          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                        </svg> */}
                      </a>
                    </div>
                    <div>
                      <a href="" id="instagramIcon">
                        <FaInstagram />
                        {/* <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Instagram</title>
                          <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                        </svg> */}
                      </a>
                    </div>
                    <div>
                      <a href="" id="xIcon">
                        <FaTwitter />
                        {/* <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>X</title>
                          <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                        </svg> */}
                      </a>
                    </div>
                    <div>
                      <a href="" id="xIcon">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Website</title>
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.93 7h-3.478c-.282-1.43-.75-2.83-1.39-4.02A9.03 9.03 0 0 1 18.93 7zM12 2.06c.93 1.28 1.66 3.07 2.07 4.94H9.93c.41-1.87 1.14-3.66 2.07-4.94zM4.47 7h3.48c.28-1.43.75-2.83 1.39-4.02A9.03 9.03 0 0 0 4.47 7zM2.06 12c0-.69.07-1.36.2-2h4.03c-.05.66-.08 1.32-.08 2s.03 1.34.08 2H2.26c-.13-.64-.2-1.31-.2-2zm2.41 7h3.48c-.64-1.19-1.11-2.59-1.39-4.02A9.03 9.03 0 0 0 4.47 19zm5.46 2.94c-.93-1.28-1.66-3.07-2.07-4.94h4.14c-.41 1.87-1.14 3.66-2.07 4.94zM19.53 17h-3.48c.64 1.19 1.11 2.59 1.39 4.02A9.03 9.03 0 0 0 19.53 17zm2.41-5h-4.03c.05-.66.08-1.32.08-2s-.03-1.34-.08-2h4.03c.13.64.2 1.31.2 2s-.07 1.36-.2 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="container-fluid pm-button mt-3">
                    <a href="myphotos.php" className="btn" id="managePhotos">
                      manage my photos
                    </a>
                  </div>
                  <div className="container-fluid">
                    <div className="myphotos mb-3">
                      {photos.length > 0 ? (
                        photos.map((p) => (
                          <div className="card" key={p.id}>
                            <div className="card-body p-0">
                              <div className="image">
                                <a href="photo.php?id=">
                                  <img
                                    src={"/photos/" + p.filename}
                                    className="img-fluid"
                                  />
                                </a>
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
                      <a href="#">
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
                        className="btn tooltip-tab"
                        id="editInfos"
                        title="Edit"
                      >
                        <FaPencil />
                      </button>
                    </div>
                    <form
                      action="edit_profile.php"
                      id="editProfileForm"
                      method="post"
                    >
                      <input type="hidden" name="user_id" defaultValue="" />
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Username</strong>
                          <div className="display-div">
                            <p>{user.username}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.displayname}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.email}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.phone_number}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.bio}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.birth_date}</p>
                          </div>
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
                          <div className="display-div">
                            <p>{user.gender}</p>
                          </div>
                          <div className="edit-div">
                            <select
                              className="form-control"
                              name="update_gender"
                              id="usergender"
                            >
                              <option value={user.gender} hidden="" />
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <strong>Country</strong>
                          <div className="display-div">
                            <p>{user.country}</p>
                          </div>
                          <div className="edit-div">
                            <div>
                              <select
                                className="form-control"
                                id="countrySelect"
                              />
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
                          <div className="display-div">
                            <p className="fc">{user.facebook}</p>
                          </div>
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
                          <div className="display-div">
                            <p className="wb">{user.website}</p>
                          </div>
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
                          <div className="display-div">
                            <p className="xLink">{user.x}</p>
                          </div>
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
                          <div className="display-div">
                            <p className="itgm">{user.instagram}</p>
                          </div>
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
    </>
  );
};
