import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BusinessProtectedRoute = ({ children }) => {
    const Navigate=useNavigate()
  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please log in first");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return Navigate('/business/login')
  }

  return children;
};

export default BusinessProtectedRoute;
