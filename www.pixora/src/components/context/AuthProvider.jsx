import { useQuery } from "@tanstack/react-query";
import { getUser } from '../utils/getUser';
import { createContext, useContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });

  const user = data || null;

  return (
    <AuthContext.Provider value={{ user, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);