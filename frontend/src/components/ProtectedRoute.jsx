import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  const token = localStorage.getItem("token");


  console.log("Auth Token ", token);
  

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;