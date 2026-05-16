import React, { useEffect, useState } from "react";
import { Navbar } from "./Layouts/Navbar";
import {
  FaBan,
  FaCamera,
  FaChartLine,
  FaCloudUploadAlt,
  FaEdit,
  FaFacebook,
  FaGlobe,
  FaHeart,
  FaIdBadge,
  FaIdCard,
  FaInstagram,
  FaLock,
  FaMapMarked,
  FaMoon,
  FaPaintBrush,
  FaRedo,
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
import { Footer } from "./Layouts/Footer";
import EditorDashboard from "./EditorDashboard";
import RequestCard from "./RequestCard";
import TopBar from "./Profile/TopBar";
import Infos from "./Profile/Infos";
import EditProfile from "./Profile/EditProfile";
import Settings from "./Profile/Settings";
import Statistics from "./Profile/Statistics";
import BottomNav from "./Layouts/BottomNav";
import { Helmet } from "react-helmet-async";


export const MyProfile = () => {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [edit, setEdit] = useState(false);
  // const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [originalUser, setOriginalUser] = useState({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: originalUser
  });
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const profileRef = useRef();
  const coverRef = useRef();
  const [loading, setLoading] = useState(true);
  // const [requests, setRequests] = useState([]);
  const [preview, setPreview] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [requester_id, setRequester_id] = useState(null);
  const [req_id, setReqId] = useState(null);
  const [photosCount,setPhotosCount] = useState(null);
  const handleOpenSlide = (image) => {
    setSlides([{ src: image.url, title: image.title }]);
    setOpen(true);
  }

  const handleFile = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  }

  const uploadResAction = (id, photoId, ownerId, requester_id, req_id) => {
    openModal('uploadEditPhoto');
    setTaskId(id);
    setImageId(photoId);
    setOwnerId(ownerId);
    setRequester_id(requester_id);
    setReqId(req_id);
    return;
  }

  useEffect(() => {
    axios
      .get("https://api.pixora.test/myprofile", {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setPhotos(res.data.photos);
          setLoading(false);
          setStatistics(res.data.statistics);
          setOriginalUser(res.data.user);
          setPhotosCount(res.data.photosCount);
          reset(res.data.user);
        }
      }
      ).catch(err => console.log(err.response?.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('https://api.pixora.test/edit_profile', data, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your profile has been updated successfully.",
          timer: 2000,
          confirmButtonColor: "rgb(0,120,255)",
          confirmButtonText: "Okay, reload page",
          showConfirmButton: true,
        }).then(() => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.pixora.test/admin_analytics', { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          setAnalytics(res.data.data);
        } else {
          console.error(res.data.message);
        }
      }catch(err){
        console.log(err?.response?.data || err?.message);
      }
    }
    fetchData();

  }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.delete('https://api.pixora.test/logout', { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  }

  const profilePicturesURL = "https://api.pixora.test/edit_profile_pictures/avatar";
  const coverPictureURL = "https://api.pixora.test/edit_profile_pictures/cover";
  const deleteProfilePictureURL = "https://api.pixora.test/edit_profile_pictures/delete_avatar";
  const deleteCoverPictureURL = "https://api.pixora.test/edit_profile_pictures/delete_cover";

  const handleProfileSelect = async () => {

    const file = profileRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const res = await axios.post(profilePicturesURL, { profile_image: base64Image }, { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          notyf.success(res.data.message);
          return window.location.reload();
        } else {
          notyf.error(res.data.message);
        }
      } catch (err) {
        console.log(err.response?.data);
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
        const res = await axios.post(coverPictureURL, { cover_image: base64Image }, { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          notyf.success(res.data.message);
          return window.location.reload();
        } else {
          notyf.error(res.data.message);
        }
      } catch (err) {
        console.log(err.response?.data);
      }
    }
  }

  const handleDeleteAvatar = async () => {
    Swal.fire({
      title: 'Delete photo profile',
      text: 'Are you sure for delete your profile picture ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it',
      confirmButtonColor: '#ed3d3d',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(deleteProfilePictureURL, { withCredentials: true, withXSRFToken: true });
          if (res.data.success) {
            notyf.success(res.data.message);
            return window.location.reload();
          } else {
            notyf.error(res.data.message);
          }
        } catch (err) {
          console.log(err.response?.data);
        } finally {
          window.location.reload();
        }
      }
    });
  }

  const handleDeleteCover = async () => {
    Swal.fire({
      title: 'Delete photo profile',
      text: 'Are you sure for delete your profile picture ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it',
      confirmButtonColor: '#ed3d3d',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(deleteCoverPictureURL, { withCredentials: true, withXSRFToken: true });
          if (res.data.success) {
            notyf.success(res.data.message);
            return window.location.reload();
          } else {
            notyf.error(res.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  useEffect(() => {
    if (Object.keys(originalUser).length) {
      reset(originalUser);
    }
  }, [originalUser, reset]);

  const uploadResult = async () => {
    try {
      const res = await axios.post('https://api.pixora.test/upload_photo', { image: preview, photo_id: imageId, ownerId: ownerId, requester_id: requester_id, req_id: req_id, task_id: taskId }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        notyf.success(res.data.message);
        window.location.reload();
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  }

  const { show, openModal, closeModal } = useModal();
  const { userCurr } = useAuth();
  function slugiFy(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  return (
    <div data-bs-page="myprofile">
      <Helmet>
        <title>Pixora : Profile</title>
      </Helmet>
      <Navbar />
      {
        !loading ? (
          <>
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
                            handleOpenSlide({ url: `https://api.pixora.test/storage/profile_pictures/${user.photo_profile}`, title: 'Profile Image' })
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
                          handleOpenSlide({ url: `http://api.pixora.test/storage/cover_images/${user.cover_image}`, title: 'Cover Image' })
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
            {
              show === "uploadEditPhoto" && (
                <ModalTemplate show={show} closeModal={closeModal}>
                  <h2 className="fw-bold">Upload Final Result</h2>
                  <div className="upload-result-container">
                    {
                      !preview ? (
                        <label htmlFor="upload-input" className="upload-dropzone">
                          <div className="icon-wrapper">
                            <FaCloudUploadAlt />
                          </div>
                          <p>Upload the final result here</p>
                          <span>Choose the image</span>
                        </label>
                      ) : (
                        <>
                          <div className="result-preview-box">
                            <img src={preview} alt="Result" />
                            <button className="change-btn" onClick={() => setPreview(null)}>
                              <FaRedo />
                            </button>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button className="btn-upload-result" onClick={() => uploadResult()}>Submit</button>
                          </div>

                        </>
                      )
                    }
                  </div>
                </ModalTemplate>
              )
            }
            <input type="file" id="upload-input" hidden onChange={handleFile} accept="image/*" />
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
                  <TopBar user={user} />
                  <div className="tab-content">
                    <Infos user={user} openModal={openModal} statistics={statistics} loading={loading} photos={photos} photosCount={photosCount} />
                    <EditProfile user={user} register={register} errors={errors} openModal={openModal} handleDeleteAvatar={handleDeleteAvatar} setEdit={setEdit} handleSubmit={handleSubmit} edit={edit} onSubmit={onSubmit} />
                    <Settings handleLogOut={handleLogOut} />
                    {
                      user?.role === 'admin' && (
                        <AdminDashboard user={user} analytics={analytics} setAnalytics={setAnalytics} />
                      )
                    }
                    {
                      user?.role === "editor" && (
                        <EditorDashboard uploadResAction={uploadResAction} />
                      )
                    }
                    {
                      user?.role === "user" && (
                        <Statistics statistics={statistics} />
                      )
                    }
                  </div>
                </div>
              </div>
            </main>
          </>
        ) : (<PageSkeleton page='myprofile' />)
      }
      <BottomNav page={'profile'} user={user} />
      <Footer type={"dash"} />
    </div>
  );
};
