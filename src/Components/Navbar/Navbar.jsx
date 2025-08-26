
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Img from "../../Assets/Img/freshcart-logo.svg";
import "./Navbar.css"; // ملف التنسيقات
import { useSelector } from 'react-redux';

export default function Navbar() {
  let {counter} = useSelector((state)=> state.counter);

  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={Img} alt="Logo" height="45" />
          <span className="fw-bold text-success fs-4">Shop</span>
        </Link>

        {/* Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                
          {/* <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/Products">Products</Link>
          </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/Brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Cart">
                    Cart
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userToken ? (
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-success px-3 rounded-pill"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link
                    className="btn btn-outline-success px-3 rounded-pill"
                    to="/Login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-success px-3 rounded-pill"
                    to="/Register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
