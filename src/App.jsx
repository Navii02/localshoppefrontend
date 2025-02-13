import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserHome from "./Pages/User/UserHome";
import BusinessHome from "./Pages/Business/BusinessHome";
import AdminHome from "./Pages/Admin/AdminHome";
import UserRegistraion from "./Pages/User/UserRegistration";
import BusinessRegisteration from "./Pages/Business/BusinessRegisteration";
import AdminRegistration from "./Pages/Admin/AdminRegistration";
import Pagentfound from "./Pages/Pagentfound";
import Wishlist from "./Pages/User/Wishlist";
import UserProfile from "./Pages/User/UserProfile";
import Order from "./Pages/User/Order";
import Cart from "./Pages/User/Cart";
import ProductPage from "./Pages/Business/ProductPage";
import BusinessRegisterationForm from "./Pages/Business/BusinessRegisterationForm";
import ProductDetails from "./Pages/User/ProductDetails";
import PaymentPage from "./Pages/User/PaymentPage";
import OrderPage from "./Pages/Business/OrderPage";
import ProfilePage from "./Pages/User/ProfilePage";
import { Approval } from "./Pages/Admin/Approval";
import BusinessusersPage from "./Pages/Admin/BusinessusersPage";
import Userpage from "./Pages/Admin/Userpage";
import { loginResponseContext } from "./context/ContextShare";
import { useContext } from "react";
import Profile from "./Pages/Business/Profile";
import ProductReviews from "./Pages/Business/ProductReviews";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import BusinessProtectedRoute from "./ProtectedRoute/BusinessProtectedRoute";

function App() {
  const { loginResponse } = useContext(loginResponseContext);

  return (
    <>
      <Routes>
        {/* user */}
        <Route path="/" element={<UserHome />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<UserRegistraion />} />
        <Route path="/register" element={<UserRegistraion register={true} />} />
        <Route
          path="/user/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productsdetail/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:productId"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        {/* Business */}
        <Route
          path="/business"
          element={
            <BusinessProtectedRoute>
              <BusinessHome />
            </BusinessProtectedRoute>
          }
        />
        <Route path="/business/login" element={<BusinessRegisteration />} />
        <Route
          path="/business/register"
          element={<BusinessRegisteration register={true} />}
        />
        <Route
          path="/business/registrationpage"
          element={
            <BusinessProtectedRoute>
              <BusinessRegisterationForm />
            </BusinessProtectedRoute>
          }
        />
        <Route
          path="/business/products"
          element={
            <BusinessProtectedRoute>
              <ProductPage />
            </BusinessProtectedRoute>
          }
        />
        <Route
          path="/business/orders"
          element={
            <BusinessProtectedRoute>
              <OrderPage />
            </BusinessProtectedRoute>
          }
        />
        <Route
          path="/business/profile"
          element={
            <BusinessProtectedRoute>
              <Profile />
            </BusinessProtectedRoute>
          }
        />
        <Route
          path="/business/reviews"
          element={
            <BusinessProtectedRoute>
              <ProductReviews />
            </BusinessProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={loginResponse ? <AdminHome /> : <Pagentfound />}
        />
        <Route path="/admin/login" element={<AdminRegistration />} />
        <Route
          path="/admin/register"
          element={<AdminRegistration register={true} />}
        />
        <Route
          path="/admin/approval"
          element={loginResponse ? <Approval /> : <Pagentfound />}
        />
        <Route
          path="/admin/businessusers"
          element={loginResponse ? <BusinessusersPage /> : <Pagentfound />}
        />
        <Route
          path="/admin/users"
          element={loginResponse ? <Userpage /> : <Pagentfound />}
        />

        <Route path="*" element={<Pagentfound />} />
      </Routes>
    </>
  );
}

export default App;
