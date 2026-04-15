import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getUser } from '../utils/getUser';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user){
          setUser(user);
          localStorage.setItem('user',JSON.stringify(user));
        }} catch (err) {
        console.error(err);
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);