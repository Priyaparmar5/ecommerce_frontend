import { useEffect } from "react";
import {  Navigate, useNavigate, Route, Routes } from "react-router-dom";
import ViewProduct from '../pages/product/ViewProduct'
import CartProduct from '../pages/product/CartProduct';
import Delivery from '../pages/order/Delivery';
import OrderPage from "../pages/order/OrderPage";
import MyOrder from '../pages/order/Myorder'
import EditAddress from "../pages/order/EditAddress";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (!authToken) {
      navigate("/public/login");
    }
  }, []);
  return (
    <>
      {authToken && (
        <Routes>
          <Route path='/product' element={<ViewProduct/>} />
          <Route path='/cart' element={<CartProduct/>} />
          <Route path='/delivery' element={<Delivery/>} />
          <Route path='/order' element={<OrderPage/>} />
          <Route path='/myorder' element={<MyOrder/>} />
          <Route path='/editaddress' element={<EditAddress  />} />
          <Route path="/*" element={<Navigate to="/product" replace />} />
        </Routes>
      )}
    </>
  );
  // return authToken ? <Outlet /> : <Navigate to={"/ViewData"} />
};
export default ProtectedRoutes;
