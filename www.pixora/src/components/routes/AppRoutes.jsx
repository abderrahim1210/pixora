import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Upload } from "../Pages/Upload";
import { Login } from "../Pages/Login";
import { SignUp } from "../Pages/SignUp";
import { MyProfile } from "../Pages/MyProfile";
import { Photo } from "../Pages/Photo";
import GalleryPreview from "../Pages/GalleryPreview";
import Photograher from "../Pages/Photograher";
import Photographers from "../Pages/Photographers";
import GalleriesSection from "../Pages/GalleriesSection";
import SearchPhotos from "../Pages/SearchPhotos";
import { UserDashboard } from "../Pages/UserDashboard";
import Terms from "../Pages/Terms";
import { ForgotPassword } from "../Pages/ForgotPassword";
import { ResetPassword } from "../Pages/ResetPassword";
import { Reports } from "../Pages/Reports";
import { ReportDetails } from "../Pages/ReportDetails";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path={`/user/:username/dashboard`} element={<UserDashboard />} />
        <Route path={`/user/:username/myprofile`} element={<MyProfile />} />
        <Route path="/photo/:id/:slug" element={<Photo />} />
        <Route path="/gallery/:id" element={<GalleryPreview />} />
        <Route path="/photographer/:id" element={<Photograher />} />
        <Route path="/photographers" element={<Photographers />} />
        <Route path="/galleries" element={<GalleriesSection />} />
        <Route path="/search" element={<SearchPhotos />} />
        <Route path="/legal/:tab" element={<Terms />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/report/:id" element={<ReportDetails />} />
      </Routes>
    </>
  );
};

export default AppRoutes;