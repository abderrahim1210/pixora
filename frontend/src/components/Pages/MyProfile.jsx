import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  FaBan,
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
import { MdAnalytics, MdUpload } from "react-icons/md";
import { FiEye, FiTrash, FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useModal } from "../context/ModalProvider";
import { useAuth } from "../context/AuthProvider";
import { Truncate } from "./Truncate";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from "./PageSkeleton";
import AdminDashboard from "./AdminDashboard";
import PhotosTemplate from "./PhotosTemplate";
import { EmptyContent } from "./EmptyContent";
import ModalTemplate from "./ModalTemplate";
import { Footer } from "./Footer";


export const MyProfile = () => {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [edit, setEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [originalUser,setOriginalUser] = useState({});
  const { register, handleSubmit, formState:{errors}, reset } = useForm({
    defaultValues:originalUser
  });
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const profileRef = useRef();
  const coverRef = useRef();
  const [loading, setLoading] = useState(false);
  
  // let namereg = /^[a-z0-9]{10,}$/;
  // let emailreg = /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/;
  // let dnamereg = /^[A-Za-zأ-ي]{1,}$/;
  // let phonereg = /^\+[1-9]\d{7,14}$/;
  // let instaReg = /^https?:\/\/(www\.)?instagram\.com\/.+$/;
  // let faceReg = /^https?:\/\/(www\.)?facebook\.com\/.+$/;
  // let xReg = /^https?:\/\/(www\.)?x\.com\/.+$/;
  // let websiteReg = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/;;
  
  const handleOpenSlide = (image) => {
    setSlides([{ src: image.url, title: image.title }]);
    setOpen(true);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/myprofile", {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.success)
          setUser(res.data.user);
          setPhotos(res.data.photos);
          setLoading(true);
          setStatistics(res.data.statistics);
          setOriginalUser(res.data.user);
          reset(res.data.user);
        }
      }
      ).catch(err => console.log(err.response?.data));
    axios.get("/json/countries.json").then((res) => res.data).then(data => setCountries(data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/edit_profile', data, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your profile has been updated successfully.",
          timer: 2000,
          confirmButtonColor: "rgb(0,120,255)",
          confirmButtonText: "Okay, reload page",
          showConfirmButton: true,
        }).then(()=>{
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes",
          confirmButtonColor: "rgb(0, 120, 255)",
          text: res.data.message || "No updates detected.",
        });
        console.log(res.data);
      }
    } catch (err) {
      console.log(err.response?.data);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again.",
      });
    }
  }

  // useEffect(() => {
  //   axios.get('http://localhost/Pixora/backend/api/adminAnalytics.php', { withCredentials: true })
  //     .then(res => {
  //       if (res.data.success) {
  //         setAnalytics(res.data);
  //         console.log(res.data);
  //       } else {
  //         console.log(res.data);
  //       }
  //     });
  // }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.post('http://localhost/Pixora/backend/api/logout.php', { done: true }, { withCredentials: true });
      if (res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const profilePicturesURL = "http://localhost/Pixora/backend/api/profile_pictures.php";

  const handleProfileSelect = async () => {

    const file = profileRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const res = await axios.post(profilePicturesURL, { action_type: "profile_picture", profile_image: base64Image }, { withCredentials: true });
        if (res.data.success) {
          notyf.success(res.data.message);
        } else {
          notyf.error(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleCoverSelect = async () => {

    const file = coverRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const res = await axios.post(profilePicturesURL, { action_type: "cover_image", cover_image: base64Image }, { withCredentials: true });
        if (res.data.success) {
          notyf.success(res.data.message);
        } else {
          notyf.error(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleDeleteAvatar = async () => {
    try {
      const res = await axios.delete(profilePicturesURL, { withCredentials: true, data: { action_type: "delete_profile_picture" } });
      if (res.success) {
        notyf.success(res.message);
      } else {
        notyf.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteCover = async () => {
    try {
      const res = await axios.delete(profilePicturesURL, { withCredentials: true, data: { action_type: "delete_cover_image" } });
      if (res.data.success) {
        notyf.success(res.data.message);
      } else {
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  if(Object.keys(originalUser).length) {
    reset(originalUser);
  }
}, [originalUser, reset]);

  const { show, openModal, closeModal } = useModal();
  const { userCurr } = useAuth();
  function slugiFy(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  return (
    <div data-bs-page="myprofile">
      <Navbar data={userCurr} />
      {show === "profilePicture" && (
        <>
          <ModalTemplate show={show} closeModal={closeModal}>
            <div>
              <div className="profile_settings p-0">
                <div className="sheet-item">
                  <input type="file" ref={profileRef} onChange={handleProfileSelect} accept="image/*" hidden />
                  <div className="sheet-icon">
                    <FiUpload size={25} />
                  </div>
                  <a style={{ cursor: "pointer" }} className="sheet-link" onClick={() => (profileRef.current.click())}>
                    <span>Upload profile picture</span>
                  </a>
                </div>
                <div className="sheet-item">
                  <div className="sheet-icon">
                    <FiEye size={25} />
                  </div>
                  <a href="#" className="sheet-link" onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                    setTimeout(() => {
                      handleOpenSlide({ url: `/profile_pictures/${user.photo_profile}`, title: 'Profile Image' })
                    }, 200);
                  }}>
                    <span>Preview profile picture</span>
                  </a>
                </div>
                <div className="sheet-item deleteOption">
                  <div className="sheet-icon">
                    <FiTrash size={25} />
                  </div>
                  <a style={{ cursor: "pointer" }} className="sheet-link" onClick={handleDeleteAvatar}>
                    <span>
                      Delete profile picture
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </ModalTemplate>
        </>
      )}
      {show === "coverImage" && (
        <ModalTemplate show={show} closeModal={closeModal}>
          <div>
            <div className="profile_settings p-0">
              <div className="sheet-item">
                <input type="file" ref={coverRef} onChange={handleCoverSelect} hidden />
                <div className="sheet-icon">
                  <FiUpload size={25} />
                </div>
                <a
                  className="sheet-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => coverRef.current.click()}
                >
                  <span>Upload cover picture</span>
                </a>
              </div>
              <div className="sheet-item">
                <div className="sheet-icon">
                  <FiEye size={25} />
                </div>
                <a href="#" className="sheet-link" onClick={(e) => {
                  e.preventDefault();
                  closeModal();
                  setTimeout(() => {
                    handleOpenSlide({ url: `/cover_images/${user.cover_image}`, title: 'Cover Image' })
                  }, 200);
                }}>
                  <span>Preview cover picture</span>
                </a>
              </div>
              <div className="sheet-item deleteOption">
                <div className="sheet-icon">
                  <FiTrash size={25} />
                </div>
                <a style={{ cursor: "pointer" }} className="sheet-link" onClick={handleDeleteCover}>
                  <span>Delete cover picture</span>
                </a>
              </div>
            </div>
          </div>
        </ModalTemplate>
      )}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={slides}
      >
      </Lightbox>
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
                  {user.role === "user" ? (
                    <li className="nav-item">
                      <a
                        data-bs-target="#statistics"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        <FaChartLine /> statistics
                      </a>
                    </li>) : (<li className="nav-item">
                      <a
                        data-bs-target="#admin"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        <MdAnalytics /> Analytics
                      </a>
                    </li>
                  )}
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
                        cursor: "pointer"
                      }}
                      onClick={() => openModal('coverImage')}
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
                        onClick={() => openModal("profilePicture")}
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
                      <h3 className="fw-semibold mb-1">{user?.display_name}</h3>
                    </div>
                    <div>
                      {
                        user.role === "admin" && (
                          <span className="badge">Admin</span>
                        )
                      }
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
                    <div>{statistics?.followers ?? 0} Followers</div>
                    <div>{statistics?.followings ?? 0} Following</div>
                    <div>{statistics?.likes ?? 0} Likes</div>
                    <div>{statistics?.photosCount ?? 0} Photos</div>
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
                    <Link to={`/${user.username}/myphotos`} className={`btn ${user.role === "admin" ? "disabled" : ""}`} id="managePhotos">
                      manage my photos
                    </Link>
                  </div>
                  <div className="container-fluid">
                    <div className="mb-3">
                      {!loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos.length > 0 ? (
                        <PhotosTemplate photos={photos} />
                      ) : user.role === "user" ? (<EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />) : (<EmptyContent icon={<FaBan className="faIcon" />} text={"Upload is not availabe for adminstrators"} />)}
                    </div>
                    {user.role === "user" && (<a href="#" style={{ textDecoration: "underline" }}>
                      Show more
                    </a>)}
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
                      src={user.photo_profile ? `/profile_pictures/${user.photo_profile}` : "/outils/pngs/useracc2.png"}
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
                      onSubmit={handleSubmit(onSubmit)}
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
                                  id="username"
                                  {...register('username', {
                                    validate:(value)=>{
                                      if (value === originalUser.username) return true;
                                      return /^[a-zA-Z0-9_]{6,}$/.test(value) || 'Invalid username'
                                    },
                                  })}
                                  defaultValue={user.username}
                                />
                                {errors.username && <span className="errors">{errors.username.message}</span>}
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Display name</strong>
                              <div className="edit-div">
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('display_name')}
                                  id="userdname"
                                  defaultValue={user.display_name}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Email</strong>
                              <div className="edit-div">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="useremail"
                                  {...register('email',{
                                    validate:(value)=>{
                                      if (value === originalUser.email) return true;
                                      return /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/.test(value) || 'Invalid email'
                                    },
                                  })}
                                  defaultValue={user.email}
                                />
                                {errors.email && <span className="errors">{errors.email.message}</span>}
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Phone number</strong>
                              <div className="edit-div">
                                <input
                                  type="tel"
                                  className="form-control"
                                  {...register('phone',{
                                    validate:(value)=>{
                                      if (originalUser.phone_number && value === originalUser.phone_number) return true;
                                      return /^\+[1-9]\d{7,14}$/.test(value) || 'Invalid phone number'
                                    },
                                  })}
                                  id="userphone"
                                  defaultValue={user.phone_number}
                                />
                                {errors.phone && <span className="errors">{errors.phone.message}</span>}
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Bio</strong>
                              <div className="edit-div">
                                <textarea
                                  id="bio"
                                  className="form-control"
                                  rows={1}
                                  {...register('bio')}
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
                                  id="userbirth"
                                  {...register('birth_date')}
                                  defaultValue={user.birth_date}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Gender</strong>
                              <div className="edit-div">
                                <select
                                  className="form-control"
                                  id="usergender"
                                  {...register('gender')}
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
                                    {...register('country')}
                                  >
                                    <option value={user?.country}>{user?.country}</option>
                                    {
                                      countries.map(c => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
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
                                  id="facebook"
                                  className="form-control"
                                  rows={1}
                                  {...register('facebook')}
                                  defaultValue={user.facebook}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Website</strong>
                              <div className="edit-div">
                                <textarea
                                  id="website"
                                  className="form-control"
                                  rows={1}
                                  {...register('website')}
                                  defaultValue={user.website}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>X</strong>
                              <div className="edit-div">
                                <textarea
                                  id="x"
                                  className="form-control"
                                  rows={1}
                                  {...register('x')}
                                  defaultValue={user.x}
                                />
                              </div>
                            </li>
                            <li className="list-group-item">
                              <strong>Instagram</strong>
                              <div className="edit-div">
                                <textarea
                                  id="instagram"
                                  className="form-control"
                                  rows={1}
                                  {...register('instagram')}
                                  defaultValue={user.instagram}
                                />
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
                                <p>{user.display_name}</p>
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
                        className={`btn w-100 ${!edit && 'disabled'}`}
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
                      <a onClick={handleLogOut} style={{ cursor: "pointer" }} className="btn btn-sm">
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
                      <FaUserPlus size={25} className="stat-icon" />
                      <h3>Following</h3>
                      <p>{statistics?.followings ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaHeart size={25} className="stat-icon" />
                      <h3>Likes</h3>
                      <p>{statistics?.likes ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaUsers size={25} className="stat-icon" />
                      <h3>Followers</h3>
                      <p>{statistics?.followers ?? 0}</p>
                    </div>
                    <div className="stat-card">
                      <FaCamera size={25} className="stat-icon" />
                      <h3>Photos</h3>
                      <p>{statistics?.photosCount ?? 0}</p>
                    </div>
                  </div>
                  <div className="container statisticsGraph">
                    <canvas id="statisticsChart" height="auto" />
                  </div>
                </div>
              </div>
              <AdminDashboard analytics={analytics} />
            </div>
          </div>
        </div>
      </main>
      <Footer type={"footer"} />
    </div>
  );
};
