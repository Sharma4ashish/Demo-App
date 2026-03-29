import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.data.user);

      setUser(res.data.data.user);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);