import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Upload } from "../Upload";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { MyProfile } from "../MyProfile";
import axios from "axios";
export const AppRoutes = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost/Pixora/backend/api/get_user.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home data={user} />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/myprofile" element={<MyProfile data={user} />} />
    </Routes>
  );
};
