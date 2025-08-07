import React, { useEffect, useState } from "react";
import "../../../assets/css/admin/login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const port = import.meta.env.VITE_SERVER_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const getUsername = localStorage.getItem("unameData");
  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);

  useEffect(() => {
    if (getUsername) {
      navigate("/admin/login");
    }
  }, [getUsername, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("adminToken", "ahmad");
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>Login</h2>
          <p className="subtitle">Welcome back! Please enter your details.</p>
          <form onSubmit={handleLogin}>
            <div className="admin-login-input-group">
              <input type="email" placeholder="Email" required/>
            </div>
            <div className="admin-login-input-group">
              <input
                type={passwordViewOrHide ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                style={{
                  position: "absolute",
                  right: "4%",
                  top: "30%",
                  cursor: "pointer",
                  color: "gray",
                }}
                onClick={() => {
                  setPasswordViewOrHide(!passwordViewOrHide);
                }}
              >
                {passwordViewOrHide ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
