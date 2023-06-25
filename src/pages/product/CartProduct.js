import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

function CartProduct() {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isFirstOrder, setIsFirstOrder] = useState(false);

  console.log(cartData, "cartData..");

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

        if (response.data.length > 0) {
          setIsFirstOrder(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isFirstOrder) {
    setIsFirstOrder(true);
    localStorage.setItem("isFirstOrder", true);
  }

  const handleRemoveFromCart = async (id) => {
    console.log("hiii");
    try {
      await axios.delete(`http://localhost:3001/cart/remove/${id}`);
      setCartData((prevProducts) =>
        prevProducts.filter((product) => product.productId !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (id) => {
    const updatedCartData = cartData.map((item) => {
      console.log(item.productId, typeof item.id, "productid..}");
      console.log(id, typeof item, "item");

      if (item.productId === id) {
        const newQuantity = parseInt(item.quantity) + 1;
        const newPrice = parseInt(item.price) * parseInt(newQuantity);
        return {
          ...item,
          quantity: newQuantity,
          price: newPrice,
        };
      }
      return item;
    });

    console.log(updatedCartData, "updated cart data");
    setCartData(updatedCartData);

    try {
      const updatedProductIndex = updatedCartData.findIndex(
        (item) => item.productId === id
      );
      console.log(updatedProductIndex, "updateindex..");
      if (updatedProductIndex !== -1) {
        const updatedProduct = updatedCartData[updatedProductIndex];
        console.log(updatedProduct.productId, "yuppp");
        await axios.put(
          `http://localhost:3001/cart/update/${updatedProduct.productId}`,
          {
            quantity: updatedProduct.quantity,
            price: updatedProduct.price,
          }
        );

        console.log("Cart product updated successfully");

        const total = updatedCartData.reduce((accumulator, item) => {
          const itemPrice = parseFloat(item.price);
          return accumulator + itemPrice;
        }, 0);

        setTotalPrice(total.toFixed(2));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        const newPrice = (parseInt(item.price) / item.quantity) * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          price: newPrice,
        };
      }
      return item;
    });

    setCartData(updatedCartData);

    try {
      const updatedProductIndex = updatedCartData.findIndex(
        (item) => item.productId === productId
      );

      if (updatedProductIndex !== -1) {
        const updatedProduct = updatedCartData[updatedProductIndex];

        await axios.put(
          `http://localhost:3001/cart/update/${updatedProduct.productId}`,
          {
            quantity: updatedProduct.quantity,
            price: updatedProduct.price,
          }
        );

        console.log("Cart product updated successfully");
        const total = updatedCartData.reduce((accumulator, item) => {
          const itemPrice = parseFloat(item.price);
          return accumulator + itemPrice;
        }, 0);

        setTotalPrice(total.toFixed(2));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const customerId = token.id;

      const response = await axios.post("http://localhost:3001/order/add", {
        customerId,
      });

      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="h-100 gradient-custom">
        <Header />

        <div className="container py-1">
        <Link to="/product" className="btn btn-primary btn-lg btn-block">
                <p className="d-none d-md-block mb-0">Back</p>
              </Link>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8 ">
            
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart items</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {cartData.length === 0 ? (
                      <p>No items in the cart.</p>
                    ) : (
                      cartData.map((product) => (
                        <>
                          <div
                            className="col-lg-3 col-md-12 mb-4 mb-lg-0"
                            key={product.id}
                          >
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={`http://localhost:3001/${product.imageUrl}`}
                                className="w-100"
                                alt="Blue Jeans Jacket"
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{product.productId}</strong>
                            </p>
                            <p>name: {product.name}</p>
                            <p>description: {product.description}</p>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-1 mb-2"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              onClick={() =>
                                handleRemoveFromCart(product.productId)
                              }
                            >
                             
                              remove
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-2" 
                              style={{ maxWidth: "200px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2 align-self-center"
                                onClick={() =>
                                  handleDecreaseQuantity(product.productId)
                                }
                              >
                                -
                              </button>

                              <div className="d-flex form-outline">
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={product.quantity}
                                  type="number"
                                  className="form-control"
                                />
                               
                              </div>
                            
                              <button
                              
                              className="btn btn-primary px-3 me-2  align-self-center"
                             
                                onClick={() =>
                                  handleIncreaseQuantity(product.productId)
                                }
                              >
                              +
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>Price : &#8377;{product.price}</strong>
                            </p>
                          </div>

                          <hr className="my-4" />
                        </>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              {cartData.length > 0 && (
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body">
                    <>
                      <ul className="list-group list-group-flush">
                        {cartData.map((product) => (
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            {product.name}
                            <span>&#8377;{product.price}</span>
                          </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                          </div>
                          <span>
                            <strong>&#8377;{totalPrice}</strong>
                          </span>
                        </li>
                      </ul>

                      <Link
                        to="/order"
                        className="btn btn-primary btn-lg btn-block"
                        state={totalPrice}
                        onClick={() => handleCheckout()}
                      >
                        <p className="d-none d-md-block mb-0">Go to order</p>
                      </Link>
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartProduct;
