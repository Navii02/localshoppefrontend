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




function App() {
  return (
    <>
      <Routes>
        {/* user */}
        <Route path="/" element={<UserHome />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/login" element={<UserRegistraion />} />
        <Route path="/register" element={<UserRegistraion register={true} />} />
        <Route path="/user/wishlist" element={<Wishlist/>} />
        <Route path="/user/profile" element={<UserProfile/>} />
        <Route path="/user/orders" element={<Order/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/productsdetail/:id" element={<ProductDetails/>}/>
        <Route path="/payment/:productId" element={<PaymentPage />} />

        {/* Business */}
        <Route path="/business" element={<BusinessHome />} />
        <Route path="/business/login" element={<BusinessRegisteration />} />
        <Route path="/business/register"element={<BusinessRegisteration register={true} />}/>
        <Route path="/business/registrationpage" element={<BusinessRegisterationForm/>} />
        <Route path="/business/products" element={<ProductPage/>} />
        <Route path="/business/orders" element={<OrderPage/>} />
        


        {/* Admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminRegistration />} />
        <Route path="/admin/register"element={<AdminRegistration register={true} />}/>


        <Route path="*" element={<Pagentfound />} />
      </Routes>
    </>
  );
}

export default App;
