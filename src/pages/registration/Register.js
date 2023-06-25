import React from "react";
import "./css/Register.css";
import InputField from "../../components/InputField";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { country, state, city } from "../../utils/constants";
import axios from "axios";

function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    contact: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "",
    state: "",
    city: "",
    contacts: "",
    pin_code: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .matches(/^[^0-9]*$/, "First name should not contain numbers"),

    lastName: yup
      .string()
      .required("Last name is required")
      .matches(/^[^0-9]*$/, "Last name should not contain numbers"),

    contact: yup
      .string()
      .required("contact is required")
      .length(10, "Contact must be exactly 10 characters long"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "gender is required")
      .required("Gender is required"),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address")
      .test("email-exists", "Email already exists", async function (value) {
        const emailExists = await checkEmailExists(value);
        return !emailExists;
      }),
    password: yup.string().required("Password is required").min(4).max(20),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    address: yup.string().required("Address is required"),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    pin_code: yup.string().required("pincode is required"),
    phone: yup
      .string()
      .required("contact is required")
      .length(10, "Contact must be exactly 10 characters long"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    const { firstName, lastName, gender, email, password, contact, id } = data;

    console.log("onsubmit", data);
    try {
      const res = await axios.post("http://localhost:3001/api/customer/add", {
        customerData: {
          firstName,
          lastName,
          gender,
          email,
          password,
          contact,
          Cart: [{ customerId: id }],
          Address: [{ customerId: id }],
        },
        addressData: {
          ...data,
          customerId: id,
        },
      });

      if (res.status === 200) {
        setFormData(initialValues);
        navigate("/login");
      } else {
        console.log("Email already exists");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/customer/checkemail",
        {
          params: { email },
        }
      );
      return response.data.exists;
    } catch (error) {
      console.error(error);
      throw new Error("Server error");
    }
  };
  return (
    <div>
      <section class="h-100 h-custom gradient-custom-2  ">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div
                class="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div class="card-body p-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row g-0">
                      <div class="col-lg-6">
                        <div class="p-5">
                          <h3
                            class="fw-normal mb-5"
                            style={{ color: "#4835d4" }}
                          >
                            Registration Form
                          </h3>

                          <div class="row">
                            <div class="col-md-6 mb-4 pb-2">
                              <div class="form-outline">
                                <InputField
                                  label="First Name"
                                  name="firstName"
                                  type="text"
                                  register={register}
                                  error={errors.firstName?.message}
                                />
                              </div>
                            </div>
                            <div class="col-md-6 mb-4 pb-2">
                              <div class="form-outline">
                                <InputField
                                  label="Last Name"
                                  name="lastName"
                                  type="text"
                                  register={register}
                                  error={errors.lastName?.message}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="mb-4 pb-2">
                            <div class="form-outline">
                              <InputField
                                label="Contact"
                                name="contact"
                                type="number"
                                register={register}
                                error={errors.contact?.message}
                              />
                            </div>
                          </div>
                          <div class="mb-4 pb-2">
                            <div class="form-outline">
                              <InputField
                                label="Email address"
                                name="email"
                                type="email"
                                register={register}
                                error={errors.email?.message}
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 mb-1 ">
                              <div class="form-outline form-inline">
                                <label class="form-check-label">
                                  <InputField
                                    class="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    register={register}
                                    // error={errors.gender?.message}
                                  />{" "}
                                  Male
                                </label>
                                <label class="form-check-label">
                                  <InputField
                                    class="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    register={register}
                                    //   error={errors.gender?.message}
                                  />{" "}
                                  Female
                                </label>
                                <label class="form-check-label">
                                  <InputField
                                    class="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    register={register}
                                    //  error={errors.gender?.message}
                                  />{" "}
                                  Other
                                </label>
                              </div>
                            </div>
                          </div>
                          {errors.gender && (
                            <p className="text-danger">
                              {errors.gender.message}
                            </p>
                          )}
                          <div class="mb-4 pb-2">
                            <div class="form-outline">
                              <InputField
                                label="Password"
                                name="password"
                                type="password"
                                register={register}
                                error={errors.password?.message}
                              />
                            </div>
                          </div>

                          <div class="mb-4 pb-2">
                            <div class="form-outline">
                              <InputField
                                label="confirm Password"
                                name="confirmPassword"
                                type="password"
                                register={register}
                                error={errors.confirmPassword?.message}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 bg-indigo text-white">
                        <div class="p-5">
                          <h3 class="fw-normal mb-5">Address Details</h3>

                          <div class="mb-4 pb-2">
                            <div class="form-outline form-white">
                              <InputField
                                label="street + Nr"
                                name="address"
                                type="text"
                                register={register}
                                error={errors.address?.message}
                              />
                            </div>
                          </div>

                          <div class="mb-4 pb-2">
                            <div class="form-outline form-white">
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
                                  type="number"
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
                          <button
                            type="submit"
                            class="btn btn-light btn-lg"
                            data-mdb-ripple-color="dark"
                          >
                            Register
                          </button>
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

export default Register;

//<select
// name={name}
// className="form-control form-control-lg"
// value={value}
// {...register(name)} // Use the register function from useFormContext
// onChange={onChange}
// >
// {options.map((option) => (
//   <option key={option.value} value={option.value}>
//     {option.label}
//   </option>
// ))}
// </select>
