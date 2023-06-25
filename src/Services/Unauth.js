import { useEffect } from "react";
import {Outlet,Route,Routes, Navigate,useNavigate} from "react-router-dom";
import Login from '../pages/login/Login'
import Register from "../pages/registration/Register";


const Unauth =() =>{
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    useEffect(() => {
        if (authToken) {
            navigate("/ViewProduct");
        }   
         //eslint-disable-next-line       
    }, []);

  return (
       <>
           
                <Routes>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/registration' element={<Register/>} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
          
        </>
    
  )
}

export default Unauth
