import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Upload } from "../Upload";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { MyProfile } from "../MyProfile";
import { MyPhotos } from "../MyPhotos";
import { Photo } from "../Photo";
import GalleryPreview from "../GalleryPreview";
const AppRoutes = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path={`/:username/myphotos`} element={<MyPhotos />} />
      <Route path={`/:username/myprofile`} element={<MyProfile />} />
      <Route path="/photo/:id/:slug" element={<Photo />} />
      <Route path="/gallery/:id" element={<GalleryPreview />} />
    </Routes>
    </>
  );
};

export default AppRoutes;