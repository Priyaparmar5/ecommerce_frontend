import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes  from './Services/ProtectedRoutes';
import Unauth from './Services/Unauth';
import Login from './pages/login/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import Register from './pages/registration/Register';
import ViewProduct from './pages/product/ViewProduct'
import CartProduct from './pages/product/CartProduct';
import Delivery from './pages/order/Delivery';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      {/* <Route path="/register" element={<Register/>}  /> */}
      <Route path="/public/*" element={<Unauth />} />

      <Route path="*" element={<ProtectedRoutes />} />

    {/* <Route path='/login' element={<Login/>} />
    <Route path='/registration' element={<Register/>} />
    <Route path='/product' element={<ViewProduct/>} />
    <Route path='/cart' element={<CartProduct/>} />
    <Route path='/delivery' element={<Delivery/>} /> */}
    </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
