/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";

function ViewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product/findall")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = async (
    productId,
    name,
    imageUrl,
    description,
    quantity,
    price
  ) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      alert("Please register or log in before adding items to the cart");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/cart/add", {
        customerId: token.id,
        productId,
        name,
        imageUrl,
        description,
        quantity: 1,
        price,
      });
      //  setProducts(response.data,"product");
      console.log(response.data, "resp");
      console.log(token.id, "tokennnn");
      console.log(response.data, "ress");
    } catch (error) {
      console.error(error);
    }
  };

  const showToastMessage = () => {
    toast.success("Addded to Cart !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      <section>
        <Header />
        <ToastContainer />

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <button
                className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Show filter</span>
              </button>
            </div>

            <div className="row">
              {products &&
                products.data &&
                products.data.map((product) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 d-flex"
                    key={product.id}
                  >
                    <div className="card w-100 my-2 shadow-2-strong">
                      <img
                        alt=""
                        height={300}
                        src={`http://localhost:3001/${product.imageUrl}`}
                        className="card-img-top"
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex flex-row">
                          <h5 className="mb-1 me-1">&#8377;{product.price}</h5>
                        </div>
                        <p className="card-text">{product.description}</p>
                        <div
                          onClick={showToastMessage}
                          className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto"
                        >
                          <a
                            href="#!"
                            className="btn btn-primary shadow-0 me-1"
                            onClick={() =>
                              handleAddToCart(
                                product.id,
                                product.name,
                                product.imageUrl,
                                product.description,
                                product.quantity,
                                product.price
                              )
                            }
                          >
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <hr />

            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center mt-3"
            >
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <footer className="text-center text-lg-start text-muted bg-primary mt-3">
        <section className="">
          <div className="container text-center text-md-start pt-4 pb-4">
            <div className="row mt-3">
              <div className="col-6 col-sm-4 col-lg-2">
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Store
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Find store
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-lg-2">
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default ViewProduct;
