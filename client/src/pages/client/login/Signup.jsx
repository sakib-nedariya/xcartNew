import  { useState } from "react";
import "../../../assets/css/client/login.css";
import login from "../../../assets/image/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import axios from "axios";
import { notifyError, notifySuccess, notifyWarning } from "../../admin/layout/ToastMessage";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
  });

  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, mobile_number } = formData;

    if (password !== confirmPassword) {
      return notifyWarning("Passwords do not match");
    }

    try {
      const response = await axios.post("http://localhost:1020/signup", {
        username,
        email,
        password,
        mobile_number,
      });
     

      notifySuccess(response.data.message);
      navigate("/login"); // Redirect after success
    } catch (error) {
      notifyError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main login-container">
          <div className="login">
            <img src={login} alt="Login" />
          </div>
          <div className="login-form">
            <h3>Signup</h3>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Username</label>
                <span className="required_field">*</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <span className="required_field">*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
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
                />
                <span onClick={() => setPasswordViewOrHide(!passwordViewOrHide)}>
                  {passwordViewOrHide ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <span className="required_field">*</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="Enter your mobile number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                />
              </div>

              <div className="login-btn">
                <button className="btn primary-btn" type="submit">
                  Sign Up
                </button>
              </div>

              <p className="sign-up">
                Already have an account?
                <Link to="/login">
                  <span>&nbsp;Login Now</span>
                </Link>
              </p>

              <div className="or-divider">
                <span>OR</span>
              </div>

              <div className="google-btn">
                <button className="btn primary-btn" type="button">
                  <FcGoogle style={{ fontSize: "20px", marginRight: "8px", marginBottom: "-4px" }} />
                  Continue With Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
