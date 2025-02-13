/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const Navigate=useNavigate()
  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please log in first");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return Navigate('/login')
  }

  return children;
};

export default ProtectedRoute;
