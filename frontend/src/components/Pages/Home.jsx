import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaCamera,
  FaCog,
  FaComment,
  FaHeart,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { setFavicon } from "../utils/SetFavicon";
export const Home = (props) => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/homepage.php")
      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setUsers(res.data.users);
        }
      });
    setFavicon("/outils/favicons/favicon.jpg");
  }, []);
  const user = props.data;
  return (
    <>
      <Navbar data={user} />
      <div className="div2">
        <div className="container-fluid p-0">
          <h1>discover amazing photos on Pixora</h1>
          <p id="quote" className="mt-2 mb-2">
            Every photo tells a story. What’s yours?
          </p>
          <div className="div2-1">
            <div>
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Search for anything ..."
                title="Search"
              />
              <button
                type="button"
                className="btn"
                id="searchButton"
                title="Click for search"
              >
                <FaSearch />
              </button>
              <button
                type="button"
                className="btn"
                title="Click for upload your photos"
                onClick={() => navigate("/upload")}
              >
                <FaCamera />
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="sticky-top">
        <nav className="navbar navbar-expand nav2">
          <ul className="nav mx-auto">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link active"
                data-bs-target="#foryou"
                data-bs-toggle="tab"
                title="For you"
              >
                For you
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-target="#categories"
                data-bs-toggle="tab"
                title="Categories"
              >
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-target="#photographers"
                data-bs-toggle="tab"
                title="Photographers"
              >
                Photographers
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-target="#about"
                data-bs-toggle="tab"
                title="About"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="tab-content">
        <div
          className="container-fluid tab-pane fade show active mt-3 mb-3"
          id="foryou"
        >
          <h1 className="text-center fw-bold">For you</h1>
          <div className="photos">
            {photos.map((p) => (
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form
                      action="add_comments.php"
                      className="comment-form"
                      method="post"
                    >
                      <input
                        type="hidden"
                        name="photo_id"
                        defaultValue={p.id}
                      />
                      <div className="input-group">
                        <textarea
                          className="up_comment form-control"
                          name="comment_content"
                          placeholder="Type your comment ..."
                          rows={1}
                          cols={1}
                          defaultValue={""}
                        />
                        <button
                          type="submit"
                          className="btn btn-primary postBtn disabled"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className="mt-3">
                      <h4 className="fw-bold">All comments</h4>
                      {""}
                    </div>
                  </Modal.Body>
                </Modal>
                <div className="card">
                  <a
                    id="caption"
                    href="photo_preview.php?id=<?= $row['id']; ?>"
                  ></a>
                  <div className="photo">
                    <a
                      id="caption"
                      href="photo_preview.php?id=<?= $row['id']; ?>"
                    >
                      <img
                        src={`/photos/${p.filename}`}
                        alt="photo"
                      />
                    </a>
                    <div className="info">
                      <a
                        id="caption"
                        href="photo_preview.php?id=<?= $row['id']; ?>"
                      >
                        <div>
                          <h5>{p.title}</h5>
                        </div>
                      </a>
                      <div>
                        <a id="caption" href="photo_preview.php">
                          <input
                            type="hidden"
                            name="photo_id"
                            defaultValue={p.id}
                          />
                        </a>
                        <a
                          href="#"
                          className="likeButton <?= $row['isLiked'] ? 'active' : '' ?>"
                          data-photo-id="<?= $row['id']; ?>"
                        >
                          <FaHeart />{" "}
                          <span id="likes_count-<?= $row['id']; ?>">
                            {p.totalLikes}
                          </span>
                        </a>
                        <a href="#" onClick={handleOpen}>
                          <FaComment />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div
          className="container-fluid tab-pane fade show mt-3 mb-3"
          id="categories"
        >
          <h1>Categories</h1>
          <div className="container-fluid mt-3 mb-3">
            <div className="categories">
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <a href="#">
                      <h3>Nature</h3>
                      <img src="/outils/categories/nature.jpg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Animals</h3>
                    <img src="/outils/categories/animals.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Architecture</h3>
                    <img src="/outils/categories/artchitecture.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Landscape</h3>
                    <img src="/outils/categories/landscape.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>People</h3>
                    <img src="/outils/categories/peopl.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Travel</h3>
                    <img src="/outils/categories/travel.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Technology</h3>
                    <img src="/outils/categories/tech.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Fantasy / Anime</h3>
                    <img src="/outils/categories/fantasy.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Food &amp; Drinks</h3>
                    <img src="/outils/categories/food.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Cars</h3>
                    <img src="/outils/categories/cars.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Sports</h3>
                    <img src="/outils/categories/sport.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="category">
                <div className="image">
                  <div className="info1">
                    <h3>Abstract</h3>
                    <img src="/outils/categories/abstract.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid tab-pane fade show mt-3 mb-3"
          id="photographers"
        >
          <h1 className="text-center">Photographers</h1>
          <div className="mt-3 mb-3 d-flex justify-content-center">
            <input
              type="search"
              name
              id="searchAtPhotographer"
              className="form-control"
              placeholder="Type name of photographer ..."
            />
            <button type="button" className="btn searchButton2">
              <CiSearch size={20} color={"black"} />
            </button>
          </div>
          <div className="container-fluid div3">
            {users.map((u) => (
              <div className="card photographers">
                <div className="card-body">
                  <div className="mt-3 mb-3">
                    <img
                      src={`${
                        u.photo_profile
                          ? "http://localhost/Pixora/profile_pictures/" +
                            u.photo_profile
                          : "/outils/pngs/useracc2.png"
                      }`}
                      id="imgAcc"
                      width="100px"
                      height="auto"
                      alt=""
                    />
                  </div>
                  <div className="mt-3 mb-3">
                    <a href="profil_preview.php?id=<?= $user['id']; ?>">
                      {u.username}
                    </a>
                  </div>
                  <div className="mt-3 mb-3">
                    <button
                      type="button"
                      data-user_id="<?= $user['id']; ?>"
                      className="followButton <?= $btnClass; ?> btn"
                      id="followButton"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/*?php endforeach; ?*/}
          </div>
        </div>
        <div
          className="container-fluid tab-pane fade show mt-3 mb-3"
          id="about"
        >
          <h1 className="text-center mt-2 mb-2">About Pixora</h1>
          <div className="container mt-2 mb-2">
            <p>
              At Pixora, we believe that every image has the power to inspire,
              to tell a story, and to connect people beyond borders. Founded
              with a passion for creativity and a vision to redefine the way
              photography and digital art are shared online, Pixora offers a
              premium platform where photographers, visual artists, and creative
              enthusiasts can showcase their work in the best possible light.
              Our mission is to create a space that combines elegance,
              simplicity, and functionality. We provide artists with the tools
              they need to present their portfolios professionally, while
              offering audiences a seamless experience to explore, admire, and
              engage with high-quality visual content. Unlike conventional
              galleries, Pixora is designed to be a global hub — bringing
              together diverse perspectives, styles, and artistic expressions
              from every corner of the world. We are committed to building a
              community where quality matters more than quantity. Every
              photograph on Pixora is more than just an image — it is a
              reflection of passion, dedication, and vision. By curating and
              highlighting exceptional work, we aim to celebrate not only
              photography as an art form, but also the people and stories behind
              each frame. As Pixora continues to grow, we strive to remain a
              trusted destination for both creators and admirers of visual art.
              Whether you are here to showcase your portfolio, discover
              inspiration, or simply enjoy the beauty of photography, we welcome
              you to join us on this journey. Together, let’s make Deluxe
              Gallery a place where art lives, stories are told, and creativity
              knows&nbsp;no&nbsp;limits.
            </p>
          </div>
        </div>
      </div>
      {/*?php include "footer.php"; ?*/}
      <div className="container-fluid">
        <nav
          className="navbar mx-auto navbar-expand fixed-bottom nav3"
          role="tablist"
        >
          <ul className="navbar-nav" id="ul3">
            <li className="nav-item">
              <a
                href="#"
                /*  onClick={window.open('dasheboard.php','_self')} */
                className="nav-link"
              >
                <FaUser size={15} color="454545" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <FaCamera size={15} color="#454545" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <FaCog size={15} color="#454545" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};
