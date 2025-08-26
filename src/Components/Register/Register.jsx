import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        navigate("/login");
      }
    } catch (err) {
      setApiError(err.response.data.message);
    }
    setIsLoading(false);
  }

  let validationSchema = Yup.object({
    name: Yup.string().min(3).max(15).required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "Password must start with capital letter and be 6–9 chars")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="register-page mt-4">
      <div className="register-card shadow-lg p-4">
        <h2 className="text-center text-success fw-bold mb-4">Create Account</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}

        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="form-control my-input"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-danger small">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control my-input"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger small">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="form-control my-input"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-danger small">{formik.errors.phone}</div>
              ) : null}
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                type="password"
                name="password"
                placeholder="Enter a strong password"
                className="form-control my-input"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger small">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Re-Password (full width) */}
            <div className="col-md-12">
              <label htmlFor="rePassword" className="form-label">
                Confirm Password
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                id="rePassword"
                type="password"
                name="rePassword"
                placeholder="Re-enter your password"
                className="form-control my-input"
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="text-danger small">{formik.errors.rePassword}</div>
              ) : null}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
              className="btn btn-success px-5 py-2 fw-bold shadow-sm my-btn"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-success fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
