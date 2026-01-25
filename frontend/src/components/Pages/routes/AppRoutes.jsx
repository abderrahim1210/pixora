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
  // const [user, setUser] = useState({});
  // const [show, setShow] = useState(null);
  // const handleClose = () => setShow(null);
  // const handleOpen = (modalname) => setShow(modalname);
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path={`/:username/myphotos`} element={<MyPhotos />} />
      <Route path={`/:username/myprofile`} element={<MyProfile />} />
      <Route path="/photo_preview/:id/:slug" element={<PhotoPreview />} />
      <Route path="/photo/:id/:slug" element={<Photo />} />
    </Routes>
    </>
  );
};
