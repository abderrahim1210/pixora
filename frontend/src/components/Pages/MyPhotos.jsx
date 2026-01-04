import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { Copyright } from "./Copyright";
import { FooterDash } from "./FooterDash";

export const MyPhotos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [photosLikes, setPhotosLikes] = useState([]);
  const [photosCount, setPhotosCount] = useState(0);
  const [likesCountPhotos, setLikesCountPhotos] = useState(0);
  const user = props.data;
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
        }
      });
  }, []);

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
                      <i className="fas fa-image" /> my photos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#licensing"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <i className="fas fa-certificate" /> licsensing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#likes"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <i className="fas fa-heart" /> likes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#galleries"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <i className="fas fa-images" /> galeries
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-target="#statistics"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      <i className="fas fa-chart-line" /> statistics
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
                    <div className="card">
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
                    </div>
                  </div>
                  <div className="empty-content text-center">
                    <div className="mb-5">
                      <i
                        className="fa-solid fa-camera"
                        /* onclick="window.location.href = 'upload.php'" */
                        style={{ cursor: "pointer" }}
                      />
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
                    {photosLikes.map((p) => (
                      <div className="card">
                        <div className="card-body p-0">
                          <div className="image">
                            <a href="photo_preview.php?id=">
                              <img src={`/photos/${p.filename}`} className="img-fluid" />
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
                    ))}
                  </div>
                  <div className="empty-content text-center">
                    <div className="mb-5">
                      <i
                        className="fa-solid fa-camera"
                        /* onclick="window.location.href = 'upload.php'" */
                        style={{ cursor: "pointer" }}
                      />
                      <h4>
                        No licensing photos yet — start licensing your best
                        shots!
                      </h4>
                    </div>
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
                    <div className="card">
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
                    </div>
                  </div>
                  <div className="empty-content text-center">
                    <div className="mb-5">
                      <i
                        className="fa-solid fa-camera"
                        /* onclick="window.location.href = 'upload.php'" */
                        style={{ cursor: "pointer" }}
                      />
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
        <FooterDash />
      </div>
    </div>
  );
};
