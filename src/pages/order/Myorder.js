import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
function Myorder() {
  const [myOrderData, setOrderData] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = token.id;
    console.log(id, "id");
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:3001/previousorder/${id}`)
      .then((response) => setOrderData(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(myOrderData, "myorderrrrr.");

  return (
    <div>
      <section className="h-100 gradient-custom">
        <Header />
     
        <div className="container py-5">
          <div className="row">
            <h2>My Orders</h2>
            {myOrderData.length === 0 ? (
                      <p>No Orders Yet.</p>
                    ) : (
            myOrderData.previousOrder &&
              myOrderData.previousOrder.map((order) => (
                <div
                  className="col-lg-2 col-md-6 col-sm-6 d-flex"
                  key={order.id}
                >
                  <div className="card w-100 my-2 shadow-2-strong">
                    <img
                      alt=""
                      // src={`http://localhost:3001/${order.imageUrl}`}
                      className="card-img-top"
                    />
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex flex-row">
                        <h6 className="mb-1 me-1">OrderId: {order.orderId}</h6>
                      </div>
                      <div className="d-flex flex-row">
                        <h6 className="mb-1 me-1">
                          Product Id: {order.productId}
                        </h6>
                      </div>

                      <span className="card-text">
                        Product Name : {order.name}
                      </span>
                      <span className="card-text">
                        Price: &#8377;{order.price}
                      </span>
                      <span className="card-text">
                        Quantity : {order.quantity}
                      </span>
                      {myOrderData.add &&
                        myOrderData.add.map((order) => (
                          <>
                            <h6 className="mb-1 me-1">
                              Address : {order.address}
                            </h6>

                            <span className="card-text">
                              Pin code: {order.pin_code}
                            </span>
                            
                            <span className="card-text">
                              City: {order.city}
                            </span>
                            <span className="card-text">
                              {order.state + ", "}
                              {order.country}
                            </span>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              )
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Myorder;
