import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.replace("/");
    } else {
      window.location.replace("/login");
    }
  }, []);
  return null;
}