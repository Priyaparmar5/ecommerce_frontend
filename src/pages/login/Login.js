import React from "react";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup.string().required("Password is required").min(4).max(20),
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
    console.log(data, "dataaa");
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        data,
      });

      console.log(response.data, "response.data");
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/product");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <section class=" h-custom gradient-custom-2">
        <div class="container py-5  h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-6">
              <div
                class="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div class="card-body p-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row g-0">
                      <div class="col-lg-12 ">
                        <div class="p-5">
                          <h3
                            class="fw-normal mb-5"
                            style={{ color: "#4835d4" }}
                          >
                            Login Form
                          </h3>

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
                          <p>
                            not registered ?
                            <Link to="/public/registration">click here</Link>
                          </p>
                          <button
                            type="submit"
                            class="btn btn-primary btn-lg btn-block"
                          >
                            Sign in
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
