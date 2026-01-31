import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaCamera,
  FaCameraRetro,
  FaCog,
  FaComment,
  FaHeart,
  FaInfoCircle,
  FaSearch,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { setFavicon } from "../utils/SetFavicon";
import { FiStar } from "react-icons/fi";
import { MdCategory, MdRecommend } from "react-icons/md";
import Comments from "./Comments";
import {CopyToClipboard} from 'copy-to-clipboard';
import { useAuth } from '../context/AuthProvider'
import { useModal } from "../context/ModalProvider";
export const Home = (props) => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [usrSearched, setUsrSearched] = useState([]);
  const [search, setSearch] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [text,setText] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/homepage.php", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setUsers(res.data.users);
          setUsrSearched(res.data.users);
        }
      });
    setFavicon("/outils/favicons/favicon.jpg");
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setUsrSearched(users);
    } else {
      setUsrSearched(
        users.filter((u) =>
          u.username.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  // const show = props.modalState;
  // const handleOpen = props.openModal;
  // const handleClose = props.closeModal;
  // const user = props.data;
  const {show,openModal,closeModal} = useModal();
  const {user} = useAuth();

  function slugiFy(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }

  const handleComment = async (id) => {
    try {
      await axios.post('http://localhost/Pixora/backend/api/add_comments.php', { photo_id: id, comment: comment }, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = async (photoid) => {
    try {
      const res = await axios.post("http://localhost/Pixora/backend/api/add_like.php", { photo_id: photoid }, { withCredentials: true });
      if (res.data.success) {
        setPhotos((prevPhotos) =>
          prevPhotos.map((p) =>
            p.id === photoid ? { ...p, isLiked: !p.isLiked, totalLikes: res.data.totalLikes } : p
          )
        );
      } else {
        navigate('/login',{state:{liked:true,message:"You have to logged first for add like"}});
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleComments = (p) => {
    setActivePhoto(p);
    openModal("comments");
  }
  return (
    <div data-bs-page="pixora">
      <Navbar data={user} />
      <div className="div2">
        <div className="container-fluid p-0">
          <h1 style={{ fontWeight: "700" }}>discover amazing photos on Pixora</h1>
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
                <MdRecommend /> For you
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
                <MdCategory /> Categories
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
                <FaCamera /> Photographers
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
                <FaInfoCircle /> About
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
            {activePhoto && (
              <Modal show={show === "comments"} className="modal-comments" onHide={closeModal}>
                {/* <Modal.Header closeButton>
                  <Modal.Title>Comments</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="modalBody">
                  <h3>Comments</h3>
                  <div
                    className="comment-form"
                  >
                    <div className="input-group">
                      <textarea
                        id="up_comment"
                        name="comment_content"
                        placeholder="Type your comment ..."
                        className="form-control"
                        rows={1}
                        cols={1}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <input type="hidden" name="photo_id" defaultValue="" />
                      <button
                        className={`btn btn-primary ${comment === "" ? "disabled" : ""}`}
                        onClick={() => handleComment(activePhoto.id)}
                        id="postBtn"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-3">
                    <h4 className="fw-bold">All comments</h4>
                    {/* <Comments data={comments} photoId={photo.photo_id} currUser={userId} /> */}
                    <Comments data={activePhoto.comments} photoId={activePhoto.id} currUser={user} />
                  </div>
                </Modal.Body>
              </Modal>
            )}
            {photos.map((p) => (
              <div className="card" key={p.id}>
                <Link
                  key={p.id}
                  id="caption"
                  style={{ cursor: "pointer" }}
                ></Link>
                <div className="photo">
                  <Link
                    id="caption"
                    style={{ cursor: "pointer" }}
                    to={`/photo/${p.id}/${slugiFy(p.title)}`}
                  >
                    <img src={`/photos/${p.filename}`} alt={p.title} onContextMenu={(e) => e.preventDefault()} />
                  </Link>
                  <div className="info">
                    <a
                      id="caption"
                    >
                      <div>
                        <h5>{p.title}</h5>
                      </div>
                    </a>
                    <div>
                      <Link id="caption">
                        <input
                          type="hidden"
                          name="photo_id"
                          defaultValue={p.id}
                        />
                      </Link>
                      <a
                        className={`likeButton ${(user.id && p.isLiked) ? 'active' : ''}`}
                        data-photo-id={p.id}
                        onClick={() => handleLike(p.id)}
                      >
                        <FaHeart />{" "}
                        <span id={`likes_count-${p.id}`}>
                          {p.totalLikes}
                        </span>
                      </a>
                      <a style={{ cursor: "pointer" }} onClick={() => handleComments(p)}>
                        <FaComment />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="container-fluid tab-pane fade show mt-3 mb-3"
          id="categories"
        >
          <h1 className="fw-bold text-center">Categories</h1>
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
          <h1 className="fw-bold text-center">Photographers</h1>
          <div className="mt-3 mb-3 d-flex justify-content-center">
            <input
              type="search"
              id="searchAtPhotographer"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type name of photographer ..."
            />
          </div>
          <div className="container-fluid div3">
            {usrSearched.length > 0 ? (
              usrSearched.map((u) => (
                <div className="card photographers" key={u.id}>
                  <div className="card-body">
                    <div className="mt-3 mb-3">
                      <img
                        src={`${u.photo_profile
                          ? `profile_pictures/${u.photo_profile}`
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
                    {u.id !== user.id ? (
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
                    ) : (
                      <div className="mt-3 mb-3">
                        <button
                          type="button"
                          data-user_id="<?= $user['id']; ?>"
                          className="followButton <?= $btnClass; ?> btn"
                          id="followButton"
                          onClick={() => navigate("/myprofile")}
                        >
                          View profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-content text-center">
                <div className="mb-5 d-flex justify-content-center align-items-center">
                  <FaCameraRetro size={40} style={{ cursor: "pointer" }} />
                  <h4>
                    No photographers found - Try searching with another name
                  </h4>
                </div>
              </div>
            )}
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
    </div >
  );
};
