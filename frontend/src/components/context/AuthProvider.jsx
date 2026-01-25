import React from 'react'
import { createContext,useContext,useEffect,useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
      }).catch((err) => {console.error('You have an error'+err?.response?.status)}
      );
  }, []);
  return (
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);