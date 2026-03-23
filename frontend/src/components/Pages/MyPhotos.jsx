import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { FaCamera, FaCertificate, FaChartLine, FaEdit, FaFileContract, FaHeart } from "react-icons/fa";
import { MdAnalytics, MdPhotoLibrary, MdVerified } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from "./PageSkeleton";
import PhotosTemplate from "./PhotosTemplate";
import { EmptyContent } from "./EmptyContent";
import { Footer } from "./Footer";

export const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [photosLikes, setPhotosLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  // if (!user?.id) navigate('/login');
  useEffect(() => {
    axios
      .get("http://localhost:8000/get_photos", {
        withCredentials: true,
        withXSRFToken:true
      })

      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setPhotosLikes(res.data.photosLikes);
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
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  return (
    <div data-bs-page="myphotos">
      <Navbar data={user} />
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
                      <MdPhotoLibrary /> galeries
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
                <div className="container-fluid">
                  <div>
                    {!loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos.length > 0 ? (
                      <PhotosTemplate photos={photos} />
                    ) : (
                      <EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="licensing">
                <div className="mt-2 mb-2">
                  <h2>
                    Requests <p className="d-inline text-primary">( request)</p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div className="myphotos mt-3 mb-3">
                    {/* <div className="card">
                      <div className="card-body p-0">
                        <div className="image">
                          <a href="photo.php?id=">
                            <img src="photos/" className="img-fluid" />
                          </a>
                        </div>
                        <div className="d-flex justify-content-between p-2">
                          <div>
                            <h5 />
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <p />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <EmptyContent icon={<FaEdit className="faIcon" />} text={"No requests yet — start request with anyone"} />
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
                    <p className="d-inline text-primary">( galleries)</p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div className="myphotos mt-3 mb-3">
                    {/* <div className="card">
                      <div className="card-body p-0">
                        <div className="image">
                          <a href="photo_preview.php?id=">
                            <img src="photos/" className="img-fluid" />
                          </a>
                        </div>
                        <div className="d-flex justify-content-between p-2">
                          <div>
                            <h5 />
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <p />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="empty-content text-center">
                    <div className="mb-5">
                      <MdPhotoLibrary size={50} />
                      <h4>No galleries yet — create your first one!</h4>
                    </div>
                  </div>
                </div>
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
