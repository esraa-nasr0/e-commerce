import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
import "./Login.css"; // هنخلي الاستايل هنا

export default function Login() {
  let { setUserToken, setuserData } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitlogin(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data?.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setuserData(data.user);
      navigate("/");
    }
  }

  let validation = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 chars")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: submitlogin,
  });

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-5 rounded-4">
        <h2 className="text-center mb-4 text-success fw-bold">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              type="email"
              name="email"
              className={`form-control ${
                formik.errors.email && formik.touched.email ? "is-invalid" : ""
              }`}
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              id="password"
              type="password"
              name="password"
              className={`form-control ${
                formik.errors.password && formik.touched.password
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit */}
          <div className="d-flex align-items-center justify-content-between">
            {isLoading ? (
              <button type="button" className="btn btn-success w-100 py-2">
                <ColorRing
                  visible={true}
                  height="30"
                  width="60"
                  ariaLabel="color-ring-loading"
                  colors={["#198754", "#28a745", "#20c997", "#6fdd8b", "#a8e6a1"]}
                />
              </button>
            ) : (
              <>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-success px-4 rounded-pill fw-semibold"
                >
                  Login
                </button>
                <Link
                  className="btn btn-outline-success px-4 rounded-pill fw-semibold"
                  to={"/register"}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
