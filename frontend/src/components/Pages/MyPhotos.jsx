import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { FaCamera, FaCertificate, FaChartLine, FaFileContract, FaHeart } from "react-icons/fa";
import { Copyright } from "./Copyright";
import { FooterDash } from "./FooterDash";
import { GiPadlock } from "react-icons/gi";
import { MdPhotoLibrary, MdVerified } from "react-icons/md";
import { RiChat1Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
// import { Notyf } from 'notyf';
// import 'notyf/notyf.min.css';
// const notyf = new Notyf({
//   duration: 4000,
//   position: {
//     x: "right",
//     y: "top",
//   }
// });
import { notyf } from "../../assets/js/notyf";

export const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [photosLikes, setPhotosLikes] = useState([]);
  const [photosCount, setPhotosCount] = useState(0);
  const [likesCountPhotos, setLikesCountPhotos] = useState(0);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user.id) navigate('/login');
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/fetch_my_photos.php", {
        withCredentials: true,
      })

      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setPhotosLikes(res.data.photosLikes);
          setPhotosCount(res.data.photosCount);
          setLikesCountPhotos(res.data.likesCountPhotos);
        }else{
          navigate('/login');
        }
      });
  }, []);
  useEffect(() => {
    if (location.state?.uploaded) {
      notyf.success(location.state.message);
      navigate(location.pathname,{replace:true,state:{}})
    }
  },[location.state]);
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
                      <MdVerified /> licsensing
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
              <div className="tab-pane fade show active" id="photos">
                <div className="mt-2 mb-2">
                  <h2>
                    My photos{" "}
                    <p className="d-inline text-primary">
                      ( {photosCount} photos)
                    </p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div className="myphotos mt-3 mb-3">
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
                </div>
              </div>
              <div className="tab-pane fade show" id="licensing">
                <div className="mt-2 mb-2">
                  <h2>
                    Licensing <p className="d-inline text-primary">( photos)</p>
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
                  <div className="empty-content text-center">
                    <div className="mb-5">
                      <MdVerified size={50} />
                      <h4>
                        No licensing photos yet — start licensing your best
                        shots!
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="likes">
                <div className="mt-2 mb-2">
                  <h2>
                    Likes{" "}
                    <p className="d-inline text-primary">
                      ( {likesCountPhotos} Photos)
                    </p>
                  </h2>
                </div>
                <div className="container-fluid">
                  <div className="myphotos mt-3 mb-3">
                    {photosLikes.length > 0 ? photosLikes.map((p) => (
                      <div className="card" key={p.id}>
                        <div className="card-body p-0">
                          <div className="image">
                            <Link
                              id="caption"
                              style={{ cursor: "pointer" }}
                              to={`/photo_preview/${p.id}/${slugiFy(p.title)}`}
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
                    )) : (
                      <div className="empty-content text-center">
                        <div className="mb-5">
                          <FaHeart size={50} />
                          <h4>
                            Nothing liked… yet! Start exploring
                          </h4>
                        </div>
                      </div>
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
              <div className="tab-pane fade show" id="statistics">
                <div className="mt-2 mb-2">
                  <h2>
                    Statistics{" "}
                    <p className="d-inline text-primary">( )</p>
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
                      <FaChartLine size={50} />
                      <h4>No statistics found for now - try later</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        <FooterDash />
      </div>
    </div>
  );
};
