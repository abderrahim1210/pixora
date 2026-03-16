import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getUser } from '../utils/getUser';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user){
          setUser(user);
          localStorage.setItem('user',JSON.stringify(user));

        }else{
          const savedUser = localStorage.getItem('user');
          if (savedUser && savedUser !== 'undefined' && savedUser !== 'null'){
            setUser(JSON.parse(savedUser));
          }else{
            setUser(null);
          }
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);