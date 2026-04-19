import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { FaCamera, FaEdit, FaHeart, FaPlus } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from "./PageSkeleton";
import PhotosTemplate from "./PhotosTemplate";
import { EmptyContent } from "./EmptyContent";
import { Footer } from "./Footer";
import { useModal } from "../context/ModalProvider";
import ModalTemplate from "./ModalTemplate";
import GalleriesTemplate from "./GalleriesTemplate";
import RequestCard from "./RequestCard";

export const MyPhotos = () => {
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
  // if (!user?.id) navigate('/login');
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
      <main className="main-content">
        <div className="container-fluid">
          <div className="row div">
            <nav className="navbar navbar-expand nav2 sticky-top" id="demo">
              <div className="mx-auto">
                <ul className="nav">
                  <li className="nav-item">
                    <a
                      data-bs-target="#photos"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      <FaCamera /> my photos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#licensing"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <FaEdit /> requests
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#likes"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <FaHeart /> likes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#galleries"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <MdPhotoLibrary /> galleries
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="photos">
                <div className="mt-2 mb-2">
                  <h2>
                    My photos{" "}
                    <p className="d-inline text-primary">
                      ( {photos?.length} photos)
                    </p>
                  </h2>
                </div>
                <div>
                  {!loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} page={'photos'} />) : photos.length > 0 ? (
                    <PhotosTemplate photos={photos} />
                  ) : (
                    <EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />
                  )}
                </div>
              </div>
              <div className="tab-pane fade show" id="licensing">
                <div className="mt-2 mb-2">
                  <h2>
                    Requests <p className="d-inline text-primary">( {requests?.length} request)</p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div className="mt-3 mb-3">
                    {requests && Object.entries(requests).length > 0 ? (
                      Object.entries(requests).map(([imageId, group]) => (
                        <RequestCard key={imageId} group={group} />
                      ))
                    ) : (
                      <EmptyContent
                        icon={<FaEdit className="faIcon" />}
                        text={"No requests yet — start request with anyone"}
                      />
                    )}
                  </div>
                  <hr />
                  <div className="mt-3 mb-3">
                    <h2>
                      Your Requests
                    </h2>
                    {requests && Object.entries(myRequests).length > 0 ? (
                      Object.entries(myRequests).map(([imageId, group]) => (
                        <RequestCard key={imageId} group={group} />
                      ))
                    ) : (
                      <EmptyContent
                        icon={<FaEdit className="faIcon" />}
                        text={"No requests for you — try again later"}
                      />
                    )}
                  </div>

                </div>
              </div>
              <div className="tab-pane fade show" id="likes">
                <div className="mt-2 mb-2">
                  <h2>
                    Likes{" "}
                    <p className="d-inline text-primary">
                      ( {photosLikes?.length ?? 0} Photos)
                    </p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div>
                    {photosLikes?.length > 0 ? (
                      <PhotosTemplate photos={photosLikes} />
                    ) : (
                      <EmptyContent icon={<FaHeart className="faIcon" />} text={"No photos liked yet - try again later"} />
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="galleries">
                <div className="mt-2 mb-2">
                  <h2>
                    Galleries{" "}
                    <p className="d-inline text-primary">({galleries?.length ?? 0} galleries)</p>
                    <button className="btn btn-primary rounded-circle add-btn" onClick={() => openModal('create-gallery')}>
                      <FaPlus />
                    </button>
                  </h2>
                </div>
                <GalleriesTemplate galleries={galleries} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        <Footer type={"footer"} />
      </div>
    </div>
  );
};
