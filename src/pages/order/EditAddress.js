import React from "react";
import InputField from "../../components/InputField";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { country, state, city } from "../../utils/constants";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function EditAddress() {
  const [fetchedAddress, setFetchedAddress] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    phone: "",
    pin_code: "",
  });
  const validationSchema = yup.object().shape({
    address: yup.string().required("Address is required"),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    pin_code: yup.string().required("pincode is required"),
    phone: yup.string().required("contact is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = token.id;

    axios
      .get(`http://localhost:3001/address/${userId}`)
      .then((response) => {
        setFetchedAddress(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(fetchedAddress, "fetchhh");
  useEffect(() => {
    setValue("address", fetchedAddress.address);
    setValue("country", fetchedAddress.country);
    setValue("state", fetchedAddress.state);
    setValue("city", fetchedAddress.city);
    setValue("phone", fetchedAddress.phone);
    setValue("pin_code", fetchedAddress.pin_code);
  }, [fetchedAddress, setValue]);

  const onSubmit = (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = token.id;

    axios
      .put(`http://localhost:3001/address/update/${userId}`, data)
      .then((response) => {
        console.log("Address updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showToastMessage = () => {
    toast.success("Address updated successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      <ToastContainer />

      <section class="h-100 h-custom gradient-custom-2  ">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div class="  card-registration" style={{ borderRadius: "15px" }}>
                <div class="card-body p-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row g-0">
                      <div class="col-lg-6 bg-indigo text-white mx-auto">
                        <div class="p-5">
                          <h3 class="fw-normal mb-5">Address Details</h3>

                          <div class="mb-4 pb-2">
                            <div class="form-outline form-white">
                              <InputField
                                label="street + Nr"
                                name="address"
                                type="text"
                                //  defaultValue={fetchedAddress.address} // Set the defaultValue prop to prefill the input field
                                register={register}
                                error={errors.address?.message}
                              />
                            </div>
                          </div>

                          <div class="mb-4 pb-2">
                            <div class="form-outline Dform-white">
                              <InputField
                                label="Country"
                                name="country"
                                type="select"
                                options={country}
                                register={register}
                                error={errors.country?.message}
                              />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-5 mb-4 pb-2">
                              <div class="form-outline form-white">
                                <InputField
                                  label="State"
                                  name="state"
                                  type="select"
                                  options={state}
                                  register={register}
                                  error={errors.state?.message}
                                />
                              </div>
                            </div>
                            <div class="col-md-7 mb-4 pb-2">
                              <div class="form-outline form-white">
                                <InputField
                                  label="City"
                                  name="city"
                                  type="select"
                                  options={city}
                                  register={register}
                                  error={errors.city?.message}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-5 mb-4 pb-2">
                              <div class="form-outline form-white">
                                <InputField
                                  label="Pin code"
                                  name="pin_code"
                                  type="text"
                                  register={register}
                                  error={errors.pin_code?.message}
                                />
                              </div>
                            </div>
                            <div class="col-md-7 mb-4 pb-2">
                              <div class="form-outline form-white">
                                <InputField
                                  label="Contact"
                                  name="phone"
                                  type="number"
                                  register={register}
                                  error={errors.phone?.message}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="button-container">
                            <button
                              onClick={showToastMessage}
                              type="submit"
                              style={{
                                marginRight: "10px",
                                backgroundColor: "pink",
                              }}
                              className="btn btn-light btn-lg"
                              data-mdb-ripple-color="dark"
                            >
                              Update
                            </button>
                            <Link
                              to="/order"
                              className="btn btn-light btn-lg"
                              style={{ backgroundColor: "blanchedalmond" }}
                              data-mdb-ripple-color="dark"
                            >
                              <p className="d-none d-md-block mb-0">
                                Go back to order
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditAddress;
