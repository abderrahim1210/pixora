import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCamera,
  FaCameraRetro,
  FaCheck,
  FaCog,
  FaComment,
  FaGlobe,
  FaHeart,
  FaInfoCircle,
  FaLink,
  FaSearch,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import axios from "axios";
import { setFavicon } from "../utils/SetFavicon";
import { MdAlbum, MdCategory, MdPhotoAlbum, MdRecommend } from "react-icons/md";
import { useAuth } from '../context/AuthProvider'
import { Truncate } from "./Truncate";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from './PageSkeleton';
import { EmptyContent } from "./EmptyContent";
import { FaPhotoFilm } from "react-icons/fa6";
import GalleriesTemplate from "./GalleriesTemplate";
export const Home = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [usrSearched, setUsrSearched] = useState([]);
  const [search, setSearch] = useState("");
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galleries,setGalleries] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/homepage", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setPhotos(res.data.photos);
          setUsers(res.data.users);
          setUsrSearched(res.data.users);
          setLoading(true);
        }
      });
    setFavicon("/outils/favicons/favicon.jpg");
  }, []);

  const followURL = "http://localhost:8000/follows";
  useEffect(() => {
    axios.get(followURL, { withCredentials: true })
      .then(res => {
        const usersArray = res.data.users;
        const ids = usersArray.map((f) => f.id);
        setFollows(ids);
      })
  }, []);

  useEffect(() => {
    const updatedUsers = users.map((u) => ({
      ...u,
      followClasse: follows.includes(u.id) ? "active" : "",
      followText: follows.includes(u.id) ? "Followed" : "Follow"
    }));
    if (search.trim() === "") {
      setUsrSearched(updatedUsers);
    } else {
      setUsrSearched(
        updatedUsers.filter((u) =>
          u.username.toLowerCase().startsWith(search.toLowerCase())

        )
      );
    }
  }, [search, users, follows]);

  const { user } = useAuth();

  function slugiFy(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }

  const addFollow = async (id) => {
    let previousFollows;
    setFollows((prev) => {
      previousFollows = prev;

      if (prev.includes(id)) {
        return prev.filter(f => f !== id);
      } else {
        return [...prev, id];
      }
    })
    try {
      const res = await axios.post(followURL, { followerID: id }, { withCredentials: true, withXSRFToken: true });
      if (res.data.status === "followed") {
        setFollows(prev => [...prev, id]);
        notyf.success("You are followed this user");
      } else {
        setFollows(prev => prev.filter(f => f !== id));
        notyf.error("You are unfollowed this user");
      }
    } catch (err) {
      setFollows(previousFollows);
      console.log(err.response?.data);
    }
  }


  const handleLike = async (photoid) => {
    let previousPhotos;
    setPhotos((prevPhotos) => {
      previousPhotos = prevPhotos
      return prevPhotos.map((p) => p.id === photoid ? { ...p, isLiked: !p.isLiked, totalLikes: p.isLiked ? p.totalLikes - 1 : p.totalLikes + 1 } : p);
    });
    try {
      const res = await axios.post("http://localhost:8000/add_like", { photo_id: photoid }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        setPhotos((prevPhotos) =>
          prevPhotos.map((p) =>
            p.id === photoid ? { ...p, totalLikes: res.data.totalLikes } : p
          )
        );
      } else {
        throw new Error('Not authorized');
      }
    } catch (err) {
      setPhotos(previousPhotos);
      navigate('/login', { state: { liked: true, message: "You have to logged first for add like" } });
      console.log(err.response?.data);
    }
  }

  useEffect(() => {
    try{
      axios.get('http://localhost:8000/get_all_galleries',{withCredentials:true,withXSRFToken:true})
      .then((res) => {
        if (res.data.success){
          setGalleries(res.data.galleries);
        }
      })
    }catch(err){
      console.log(err.response?.data);
    }
  },[])
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
        <figure>
          <figcaption>
            Photo By Eddaoudi Aya
          </figcaption>
        </figure>
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
                data-bs-target="#galleries"
                data-bs-toggle="tab"
                title="Galleries"
              >
                <MdPhotoAlbum /> Galleries
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
            {!loading ? Array(4).fill().map((_, i) => <PageSkeleton key={i} page={'photos'} />) : photos.length > 0 ? photos.map((p) => (
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
                    <img src={`http://localhost:8000/storage/photos/${p.filename}`} alt={p.title} onContextMenu={(e) => e.preventDefault()} />
                  </Link>
                  <div className="info">
                    <a
                      id="caption"
                    >
                      <div>
                        <Truncate text={p.title} maxChars={25}>
                          {({ text }) => (
                            <h5>{text}</h5>
                          )}
                        </Truncate>
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
                      <div>
                        <a
                          className={`likeButton ${(user && p.isLiked) ? 'active' : ''}`}
                          data-photo-id={p.id}
                          onClick={() => handleLike(p.id)}
                        >
                          <FaHeart />{" "}
                          <span id={`likes_count-${p.id}`}>
                            {p.totalLikes}
                          </span>
                        </a>
                        <a style={{ cursor: "pointer" }}>
                          <FaComment />{" "}
                          <span>
                            {p.comments.length}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : <EmptyContent icon={<FaPhotoFilm className="faIcon" />} text={"No photos yet - try again later!"} />}
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
                          ? `/profile_pictures/${u.photo_profile}`
                          : "/outils/pngs/useracc2.png"
                          }`}
                        id="imgAcc"
                        width="100px"
                        height="auto"
                        alt=""
                      />
                    </div>
                    <div className="mt-3 mb-3">
                      {/* <a href="profil_preview.php?id=<?= $user['id']; ?>">
                        {u.username}
                      </a> */}
                      <Truncate text={u.username} maxChars={20}>
                        {({ text }) => (
                          <a>{text}</a>
                        )}
                      </Truncate>
                    </div>
                    {u.id !== user?.id ? (
                      <div className="mt-3 mb-3">
                        <button
                          type="button"
                          className={`followButton ${u.followClasse} ${user && user?.role === "admin" && "disabled"} btn`}
                          id="followButton"
                          onClick={() => addFollow(u.id)}
                        >
                          {u.followText}
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 mb-3">
                        <button
                          type="button"
                          className="followButton btn"
                          id="followButton"
                          onClick={() => navigate(`${user && user?.username}/myprofile`)}
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
          id="galleries"
        >
          <h1 className="text-center fw-bold">Galleries</h1>
          <GalleriesTemplate galleries={galleries} />
          </div>
        <div
          className="container-fluid tab-pane fade show mt-3 mb-3"
          id="about"
        >
          <h1 className="text-center fw-bold">Inspiring Visual Excelllence</h1>
          <div className="container-fluid mt-2 mb-2">
            <p>
              At Pixora, we believe that every image tells a story beyond words.
              Our platform is built for photographers, visual artists, and creative minds who seek more than just sharing — they seek impact.
              Pixora is a premium space where creativity meets recognition.
              We curate high-quality visual content, empowering artists to showcase their work, gain visibility, and connect with a global community that appreciates true artistry.
              Whether you're here to exhibit your portfolio, discover unique perspectives, or get inspired — Pixora is where creativity finds its voice.
            </p>
          </div>
          <div className="container-fluid about-features mt-3 mb-3">
            <div className="about-feature">
              <div>
                <FaGlobe className="feature-icon" />
              </div>
              <div>
                <h3>Global Community</h3>
                <p>Connecting photographers and artists from all corners of the world.</p>
              </div>
            </div>
            <div className="about-feature">
              <div>
                <FaStar className="feature-icon" />
              </div>
              <div>
                <h3>Curated Excellence</h3>
                <p>Showcasing the best in photgraphy and digital art.</p>
              </div>
            </div>
            <div className="about-feature">
              <div>
                <FaCamera className="feature-icon" />
              </div>
              <div>
                <h3>Premium Hub</h3>
                <p>Offering a seamless experience for discovering and sharing visual art.</p>
              </div>
            </div>
          </div>
          <div className="owner-infos mt-3 mb-3">
            <div className="owner-image">
              <img src="/outils/jpg/owner.jpg" alt="owner" />
            </div>
            <div className="owner-texts">
              <h3>Founder-Building Pixora</h3>
              <p>I’m a passionate designer and developer focused on creating modern and user-friendly digital experiences.
                I enjoy turning ideas into clean, visually appealing designs while paying attention to every detail.
                Through my work, I aim to deliver high-quality visuals that help people express their ideas in a creative and impactful way. <a href="Consultez le profil de Abderrahim Khali Ali sur LinkedIn https://ma.linkedin.com/in/abderrahim-khali-ali-b5865734b" className="linkedin-link"><FaLink className="icon" /> LinkedIn</a></p>
            </div>
          </div>
          <div className="join-community mt-3 mb-3">
            <div className="join-community-texts">
              <h2>join the pixora community</h2>
              <p>Become part of a global hub for creative minds and visual artists.</p>
              <button className="btn">Join now <FaArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <nav
          className="navbar mx-auto navbar-expand fixed-bottom nav3"
          role="tablist"
        >
          <ul className="navbar-nav" id="ul3">
            <li className="nav-item">
              <a
                href="#"
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
      <Footer type={'footer'} />
    </div >
  );
};
