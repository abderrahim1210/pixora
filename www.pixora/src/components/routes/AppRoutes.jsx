import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Upload } from "../Pages/Upload";
import { Login } from "../Pages/Login";
import { SignUp } from "../Pages/SignUp";
import { MyProfile } from "../Pages/MyProfile";
import { MyPhotos } from "../Pages/MyPhotos";
import { Photo } from "../Pages/Photo";
import GalleryPreview from "../Pages/GalleryPreview";
import Photograher from "../Pages/Photograher";
import Photographers from "../Pages/Photographers";
import GalleriesSection from "../Pages/GalleriesSection";
import SearchPhotos from "../Pages/SearchPhotos";
const AppRoutes = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path={`/user/:username/myphotos`} element={<MyPhotos />} />
      <Route path={`/user/:username/myprofile`} element={<MyProfile />} />
      <Route path="/photo/:id/:slug" element={<Photo />} />
      <Route path="/gallery/:id" element={<GalleryPreview />} />
      <Route path="/photographer/:id" element={<Photograher />} />
      <Route path="/photographers" element={<Photographers />} />
      <Route path="/galleries" element={<GalleriesSection />} />
      <Route path="/search" element={<SearchPhotos />} />
    </Routes>
    </>
  );
};

export default AppRoutes;