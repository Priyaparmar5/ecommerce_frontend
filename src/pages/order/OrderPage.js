import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";


function OrderPage() {
  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the confirmation modal

  // const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const total = location.state;

  console.log(cartData, "cartDataa");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = token.id;
    console.log(id, "id");
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:3001/cart/findall/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
        console.log(response.data, "data find");
      
        setCartData(response.data);

       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = token.id;
    console.log(id, "id");
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:3001/cart/findall/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response and update the state or perform other actions
        console.log(response.data, "data find");
        // calculateTotalPrice(response.data);
        setCartData(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      return;
    }
    const id = token.id;
    axios
      .get(`http://localhost:3001/order/findall/${id}`, id, {})
      .then((response) => {
        // Handle the response and update the state or perform other actions
        console.log(response.data, "address find");
        setOrderDetails(response.data);
        // setHasAddress(response.data.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });

    
  }, []);
console.log(orderDetails,"orderrDetail");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = token.id;
    console.log(id, "id");
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:3001/order/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "data find");
        setOrderData(response.data);

      
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
console.log(orderData,"orderData");
  const handleClickGoToOrder = async () => {
    try {
      const orderProducts = cartData.map((product) => ({
        orderId: orderData.map((order) => order.id),
        addressId: orderDetails.map((address) => address.id),
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.iamgeUrl,
      }));
      console.log(orderProducts, "orderrrr");
      const response = await axios.post(
        "http://localhost:3001/order_product/add",
        orderProducts
      );
      console.log(response.data); 
      
      const token = JSON.parse(localStorage.getItem("token"));
      const id = token.id;
      if (!token) {
        return;
      }
      axios
        .delete(`http://localhost:3001/cart/removeall/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data, "Cart products removed");
          setCartData([]); 
        })
        .catch((error) => {
          console.error(error);
        });
        setShowConfirmation(true); // Show the confirmation modal

    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false); 
  };
  return (
    <div>
      
      <div className="container py-4">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Your Order</h5>
        </div>
        <div className="card-body">

          
          {orderDetails &&
            orderDetails.map((address) => (
              <>
                <ul className="list-group list-group-flush">
                <Link
                    to={"/editaddress"}
                   
                  >
                    <p className="btn btn-primary btn-sm me-1 mb-2">Edit</p>
                  </Link>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <span>address: {address.address}</span>
                  </li>
                  <span> {address.city + address.pin_code}</span>
                  <span> contact: {address.contact}</span>
                  <span> {address.state + ", " + address.country}</span>

                  <li className="list-group-item d-flex jutsify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount: </strong>
                    </div>
                    <span>
                      <strong> &#8377;{total}</strong>
                    </span>
                  </li>
                </ul>
                <Link
                 // to="/product"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleClickGoToOrder}
                >
                  <p className="d-none d-md-block mb-0">confirm order</p>
                </Link>
      
              </>
            ))}
        </div>
      </div>
    </div>
    </div>
      </div>
      <Modal show={showConfirmation} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="https://img.freepik.com/premium-vector/green-check-mark-icon-symbol-logo-circle-tick-symbol-green-color-vector-illustration_685751-503.jpg?w=740" height={100} alt="Checkmark" />
          <p>Your order has been confirmed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/product" className="btn btn-primary">
            Continue Shopping
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderPage;
