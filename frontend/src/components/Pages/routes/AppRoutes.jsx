import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Upload } from "../Upload";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { MyProfile } from "../MyProfile";
import axios from "axios";
import { MyPhotos } from "../MyPhotos";
import { Navbar } from "../Navbar";
import { PhotoPreview } from "../PhotoPreview";
import { Photo } from "../Photo";
export const AppRoutes = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(null);
  const handleClose = () => setShow(null);
  const handleOpen = (modalname) => setShow(modalname);
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/get_user.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      }).catch((err) => {console.error('You have an error'+err?.response?.status)}
      );
  }, []);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home data={user} openModal={handleOpen} closeModal={handleClose} modalState={show} />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path={`/${user?.username}/myphotos`} element={<MyPhotos data={user} />} />
      <Route path={`/${user?.username}/myprofile`} element={<MyProfile data={user} openModal={handleOpen} closeModal={handleClose} modalState={show} />} />
      <Route path="/photo_preview/:id/:slug" element={<PhotoPreview data={user} />} />
      <Route path="/photo/:id/:slug" element={<Photo data={user} />} />
    </Routes>
    </>
  );
};
