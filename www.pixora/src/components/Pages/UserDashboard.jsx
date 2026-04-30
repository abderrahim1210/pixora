import React, { useEffect, useState } from "react";
import { Navbar } from "./Layouts/Navbar";
import axios from "axios";
import { FaCamera, FaEdit, FaHeart, FaPlus } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from "./PageSkeleton";
import PhotosTemplate from "./PhotosTemplate";
import { EmptyContent } from "./EmptyContent";
import { Footer } from "./Layouts/Footer";
import { useModal } from "../context/ModalProvider";
import ModalTemplate from "./ModalTemplate";
import GalleriesTemplate from "./GalleriesTemplate";
import RequestCard from "./RequestCard";
import TopBarPhotos from "./Photos/TopBarPhotos";
import ListePhotos from "./Photos/ListePhotos";
import Requests from "./Photos/Requests";
import Likes from "./Photos/Likes";
import Galleries from "./Photos/Galleries";
import BottomNav from "./Layouts/BottomNav";

export const UserDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [photosLikes, setPhotosLikes] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { show, openModal, closeModal } = useModal();
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [gallery, setGallery] = useState({
    title: "",
    description: ""
  });
  useEffect(() => {
    axios
      .get("https://api.pixora.test/get_photos", {
        withCredentials: true,
        withXSRFToken: true
      })

      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setPhotosLikes(res.data.photosLikes);
          setGalleries(res.data.galleries);
          setLoading(true);
        } else {
          navigate('/login');
        }
      });
  }, []);
  useEffect(() => {
    if (location.state?.uploaded) {
      notyf.success(location.state.message);
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state]);
  function slugiFy(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\u0600-\u06FF\u0750-\u077F\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const res = await axios.get('https://api.pixora.test/get_requests', { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          setRequests(res.data.requests);
        }
      }
      fetchRequests();
    } catch (err) {
      console.log(err?.response?.data);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchMyReqs = async () => {
        const res = await axios.get('https://api.pixora.test/get_my_requests', { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          setMyRequests(res.data.requests);
        } else {
          console.log(res.data.message);
        }
      }

      fetchMyReqs();
    } catch (err) {
      console.log(err?.response?.data);
    }
  }, []);


  const createGallery = async () => {
    const payload = {
      title: gallery.title,
      description: gallery.description,
      user_id: user?.id
    }

    try {
      const res = await axios.post('https://api.pixora.test/create_gallery', { title: gallery.title, description: gallery.description }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        notyf.success(res.data.message);
      } else {
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }
  if (user?.role === "editor" || user?.role === "admin") return navigate(`/user/${user?.username}/myphotos`);
  return (
    <div data-bs-page="myphotos">
      <Navbar data={user} />
      {
        show === "create-gallery" && (
          <ModalTemplate show={show} closeModal={closeModal}>
            <div className="create-gallery-modal p-3">
              <h4 className="modal-title mb-3">Create New Gallery</h4>

              <div className="mb-3">
                <label className="form-label">Gallery Name</label>
                <input type="text" className="form-control custom-input" value={gallery.title} onChange={e => setGallery(prev => ({ ...prev, title: e.target.value }))} placeholder="Enter gallery name ..." />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control custom-input" rows={1} value={gallery.description} onChange={e => setGallery(prev => ({ ...prev, description: e.target.value }))} placeholder="Optional description ..."></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-light custom-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary custom-submit" onClick={createGallery}>
                  Create
                </button>
              </div>
            </div>
          </ModalTemplate>
        )
      }
      <main className="main-content flex-grow-1">
        <div className="container-fluid">
          <div className="row div">
            <TopBarPhotos />
            <div className="tab-content">
              <ListePhotos loading={loading} photos={photos} />
              <Requests requests={requests} setRequests={setRequests} myRequests={myRequests} />
              <Likes photosLikes={photosLikes} loading={loading} />
              <Galleries galleries={galleries} openModal={openModal} />
            </div>
          </div>
        </div>
      </main>
      <BottomNav page={'photos'} user={user} />  
      <Footer type={"dash"} />
    </div>
  );
};
