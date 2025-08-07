import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/client/login.css";
import loginIMG from "../../../assets/image/login-bg.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import axios from "axios";
import { notifyError, notifySuccess } from "../../admin/layout/ToastMessage";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1020/login",
        formData
      );
      localStorage.setItem("id", response.data.user.id);
      login(response.data.token);
      notifySuccess(response.data.message);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      notifyError(message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main login-container">
          <div className="login">
            <img src={loginIMG} alt="Login" />
          </div>
          <div className="login-form">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <span className="required_field">*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group password-input">
                <label>Password</label>
                <span className="required_field">*</span>
                <input
                  type={passwordViewOrHide ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setPasswordViewOrHide(!passwordViewOrHide)}
                >
                  {passwordViewOrHide ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p>Forgot password?</p>
              <div className="login-btn">
                <button className="btn primary-btn" type="submit">
                  Login
                </button>
              </div>
              <div className="or-divider">
                <span>OR</span>
              </div>
              <div className="google-btn">
                <button className="btn primary-btn" type="button">
                  <FcGoogle
                    style={{
                      fontSize: "20px",
                      marginRight: "8px",
                      marginBottom: "-4px",
                    }}
                  />
                  Continue With Google
                </button>
              </div>
              <p className="sign-up">
                Don't have an account?
                <Link to="/signup">
                  <span>&nbsp;Sign up now</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
