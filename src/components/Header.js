import React from 'react'
import { Link ,useNavigate} from "react-router-dom";


function Header() {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const handleLogout = (id) => {
        localStorage.removeItem("token");
        localStorage.removeItem("addressData");
        navigate("/public/login");
      };
 

  return (
    <div>
         <div className="bg-primary mb-3">
          <div className="container py-2">
          
           
            <div className="row gy-6">
            <h3 className="text-white mt-2">ecommerce</h3>

              <div className="order-lg-last col-lg-12 col-sm-8 col-8">

                <div className="d-flex float-start">

                  <Link
                    to={"/login"}
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center mr-2"
                    style={{ marginRight: '0.5rem' }}

                  >
                    <p className="d-none d-md-block mb-0 text-white">Sign in</p>
                  </Link>

                  <Link
                    to={"/cart"}
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center mr-2"
                    style={{ marginRight: '0.5rem' }}

                  >
                    <p className="d-none d-md-block mb-0 text-white ">My Cart</p>
                  </Link>
                  <Link
                    to={"/myorder"}
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                    style={{ marginRight: '0.5rem' }}

                  >
                    <p className="d-none d-md-block mb-0  text-white " >My Orders</p>
                  </Link>
                  <Link className="border rounded py-1 px-3 nav-link d-flex align-items-center">
                    <p
                      className="d-none d-md-block mb-0 text-white "
                      onClick={handleLogout}
                    >
                      Log out
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Header
