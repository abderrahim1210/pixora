import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCamera,
  FaCameraRetro,
  FaCheck,
  FaCog,
  FaComment,
  FaCrown,
  FaGlobe,
  FaHeart,
  FaInfoCircle,
  FaLink,
  FaSearch,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Pages/Layouts/Navbar";
import { Footer } from "../Pages/Layouts/Footer";
import axios from "axios";
import { MdAlbum, MdCategory, MdPhotoAlbum, MdRecommend } from "react-icons/md";
import { useAuth } from '../context/AuthProvider'
import { Truncate } from "../Pages/Truncate";
import { notyf } from "../../assets/js/notyf";
import PageSkeleton from '../Pages/PageSkeleton';
import { EmptyContent } from "../Pages/EmptyContent";
import { FaPhotoFilm } from "react-icons/fa6";
import GalleriesTemplate from "../Pages/GalleriesTemplate";
import { motion } from 'framer-motion';
import Motion from "../Pages/Motion";
import Avatar from "../Pages/Avatar";
import { fetchFollows, toggleFollowAction } from "../utils/getFollows";
import { FiCompass } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BottomNav from "../Pages/Layouts/BottomNav";
import ForYou from "./ForYou";
import Categories from "./Categories";
import About from "./About";
import Explore from "./Explore";
import PolicyNotice from "../Pages/PolicyNotice";
import { Compass, Info, LayoutGrid, Sparkles } from "lucide-react";


export const Home = () => {
  const navigate = useNavigate();
  const [usrSearched, setUsrSearched] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [heroImage, setHeroImage] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.pixora.test/homepage", { withCredentials: true });
      return res.data;
    } catch (err) {
      console.log(err?.response?.data);
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });

  const users = data?.users || [];
  const photos = data?.photos || [];
  const explorePhotos = data?.explore_photos || [];
  const galleries = data?.galleries || [];

  const { data: follows = [] } = useQuery({
    queryKey: ['follows'],
    queryFn: async () => {
      const res = await axios.get('https://api.pixora.test/follows', { withCredentials: true, withXSRFToken: true });
      return res.data?.users?.map(f => f.following_id) || [];
    },
    onSuccess: (data) => setLocalFollows(data)
  });

  const queryClient = useQueryClient();
  const addFollow = async (id) => {
    const newFollows = follows.includes(id) ? follows.filter(fid => fid !== id) : [...follows, id];
    queryClient.setQueryData(['follows'], newFollows);

    try {
      await axios.post('https://api.pixora.test/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
    } catch (err) {
      queryClient.setQueryData(['follows'], previousFollows);
      console.log(err?.response?.data);
    }
  }

  useEffect(() => {
    try {
      const fetchHeroImage = async () => {
        const res = await axios.get('https://api.pixora.test/get_hero_images', { withCredentials: true });
        if (res.data.success) {
          setHeroImage(res.data.photo);
        } else {
          console.log(res.data.message);
        }
      }

      fetchHeroImage();
    } catch (err) {
      console.log(err?.response?.data);
    }
  }, []);

  const { user } = useAuth();

  function slugiFy(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }


  const handleLike = async (photoid) => {
    let previousPhotos;
    queryClient.setQueryData(['data'], (oldData) => {
      if (!oldData) return oldData;
      const updateMap = (list) => list.map((p) =>
        p.id === photoid
          ? {
            ...p,
            isLiked: !p.isLiked,
            totalLikes: p.isLiked ? (p.totalLikes - 1) : (p.totalLikes + 1)
          }
          : p
      );

      return {
        ...oldData,
        photos: updateMap(oldData.photos || []),
        explore_photos: updateMap(oldData.explore_photos || [])
      };
    });
    try {
      const res = await axios.post("https://api.pixora.test/add_like", { photo_id: photoid }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        queryClient.setQueryData(['data'], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            photos: oldData.photos.map((p) =>
              p.id === photoid ? { ...p, totalLikes: res.data.totalLikes } : p
            ),
          };
        });
      } else {
        throw new Error('Not authorized');
      }
    } catch (err) {
      setPhotos(previousPhotos);
      navigate('/login', { state: { liked: true, message: "You have to logged first for add like" } });
      console.log(err.response?.data);
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <div data-bs-page="pixora">
      <PolicyNotice />
      <Navbar data={user} className='sticky-top' />

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
                <Sparkles /> For you
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-target="#explore"
                data-bs-toggle="tab"
                title="Explore"
              >
                <Compass /> Explore
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
                <LayoutGrid /> Categories
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
                <Info /> About
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="div2" style={
        { backgroundImage: `url('https://api.pixora.test/storage/photos/${heroImage.filename}')` }
      }>
        <div className="container-fluid p-0">
          <Motion>
            <h1>discover amazing photos on Pixora</h1>
            <p id="quote" className="mb-2">
              Every photo tells a story. What’s yours?
            </p>
          </Motion>
          <div className="div2-1">
            <div>
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Search for anything ..."
                title="Search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button
                type="button"
                className="btn"
                id="searchButton"
                title="Click for search"
                onClick={() => navigate(`/search?searchTerme=${term}`)}
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
            Photo By {heroImage.username?.split('_')[0]}
          </figcaption>
        </figure>
        <br />
      </div>

      <div className="tab-content">
        <ForYou photos={photos} user={user} isLoading={isLoading} users={users} follows={follows} addFollow={addFollow} getGreeting={getGreeting} slugiFy={slugiFy} handleLike={handleLike} />
        <Explore photos={explorePhotos} user={user} slugiFy={slugiFy} handleLike={handleLike} galleries={galleries} />
        <Categories />
        <About />
      </div>
      <BottomNav page={'home'} />
      <Footer type={'footer'} />
    </div>
  );
};
