import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { AllStaff } from "../Pages/AllStaff";
import { AllRequestsAdmin } from "../Pages/AllRequestsAdmin";
import { BannedOverlay } from "../Pages/BannedOverlay";
import { useAuth } from "../context/AuthProvider";
import { ManagePaymentAccounts } from "../Pages/Profile/ManagePaymentAccounts";
const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isPublicPage = ['/login', '/signup', '/legal/terms', '/reset-password'].includes(location.pathname);
  return (
    <>
      {
        user?.status === 'banned' && !isPublicPage && (
          <BannedOverlay user={user} />
        )
      }
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
        <Route path="/staff" element={<AllStaff />} />
        <Route path="/requests" element={<AllRequestsAdmin />} />
        <Route path="/manage_payment_accounts" element={<ManagePaymentAccounts />} />
      </Routes>
    </>
  );
};

export default AppRoutes;