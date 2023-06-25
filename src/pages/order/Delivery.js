import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Delivery() {
  const initialValues = {
    address: "",
    country: "",
    state: "",
    city: "",
    contact: "",
    pin_code: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
 

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    //  resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    console.log("onsubmit", data);
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.post("http://localhost:3001/order/address/add", {
        ...data,
       customerId: token.id,
      });
      if (res.status === 200) {
        setFormData(initialValues);
  
        localStorage.setItem("addressData", JSON.stringify(data));
      
        navigate("/order");
      } else {
        console.log("error..");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row mt-3 mx-3" style={{ marginTop: "25px" }}>
        <div className="col-md-3">
          <div
            style={{
              marginTop: "50px",
              marginLeft: "10px",
              className: "text-center",
            }}
          >
            <i
              id="animationDemo"
              data-mdb-animation="slide-right"
              data-mdb-toggle="animation"
              data-mdb-animation-reset="true"
              data-mdb-animation-start="onScroll"
              data-mdb-animation-on-scroll="repeat"
              className="fas fa-3x fa-shipping-fast text-white"
            ></i>
            <h3 className="mt-3 text-white">Welcome</h3>
            <p className="white-text"></p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-white btn-rounded back-button"
            >
              Go back
            </button>
          </div>
        </div>
        <div className="col-md-9 justify-content-center">
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: " #495057" }}>Delivery Details</h4>
              </div>

              <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <textarea
                        type="text"
                        id="address"
                        {...register("address")}
                        className="form-control input-custom"
                      />
                      <label className="form-label" for="form9Example1">
                        Address
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <select
                        name="Country"
                        className="country"
                        {...register("country")}
                        id="Country"
                      >
                        <option value="Usa">Usa</option>
                        <option value="Uk">Uk</option>
                        <option value="India">India</option>
                        <option value="Autralia">Autralia</option>
                      </select>
                      <label className="form-label" for="form9Example2">
                        Country
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <select
                        name="state"
                        className="form-outline"
                        {...register("state")}
                        id="state"
                      >
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharastra">Maharastra</option>
                        <option value="rajasthan">rajasthan</option>
                        <option value="uttarpradesh">uttarpradesh</option>
                      </select>
                      <label className="form-label" for="form9Example3">
                        State
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                     
                      <select
                        name="city"
                        className="form-outline"
                        {...register("city")}
                        id="city"
                      >
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="surat">surat</option>
                        <option value="baroda">baroda</option>
                        <option value="rajkot">rajkot</option>
                        <option value="mumbai">mumbai</option>
                        <option value="jaipur">jaipur</option>
                      </select>
                      <label className="form-label" for="form9Example4">
                        city
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="number"
                        id="contact"
                        name="contact"
                        {...register("contact")}
                        className="form-control input-custom"
                      />
                      <label className="form-label" for="form9Example6">
                        Contact
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="pin_code"
                        name="pin_code"
                        {...register("pin_code")}
                        className="form-control input-custom"
                      />
                      <label className="form-label" for="typeEmail">
                        pincode
                      </label>
                    </div>
                  </div>
                </div>

                <div className="float-end ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded"
                    style={{ backgroundColor: "#0062CC" }}
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
