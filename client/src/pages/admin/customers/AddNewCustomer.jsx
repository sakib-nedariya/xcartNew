import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { notifyWarning, notifySuccess } from "../layout/ToastMessage";
import default_profile from "../../../assets/image/default_profile.png";
const port = import.meta.env.VITE_SERVER_URL;

const AddNewCustomer = () => {
  const navigate = useNavigate();
  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);
  const [addCustomerData, setAddCustomerData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_name: "",
    email: "",
    mobile_number: "",
    dob: "",
    address: "",
    password: "",
    confirm_password: "",
    profile: null,
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAddCustomerData({
      ...addCustomerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddCustomerData({
        ...addCustomerData,
        profile: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };

  const saveAdminData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9_.-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^[0-9]+$/;

    if (!addCustomerData.first_name.trim()) {
      notifyWarning("First name is required");
      return;
    }
    if (!nameRegex.test(addCustomerData.first_name.trim())) {
      notifyWarning("First name should only contain alphabets");
      return;
    }
    if (!addCustomerData.last_name.trim()) {
      notifyWarning("Last name is required");
      return;
    }
    if (!nameRegex.test(addCustomerData.last_name.trim())) {
      notifyWarning("Last name should only contain alphabets");
      return;
    }
    if (
      addCustomerData.middle_name.trim() &&
      !nameRegex.test(addCustomerData.middle_name.trim())
    ) {
      notifyWarning("Middle name should only contain alphabets");
      return;
    }
    if (!addCustomerData.user_name.trim()) {
      notifyWarning("Username is required");
      return;
    }
    if (!usernameRegex.test(addCustomerData.user_name.trim())) {
      notifyWarning(
        "Username can only contain letters, numbers, underscores, dots, and hyphens"
      );
      return;
    }
    if (!addCustomerData.email.trim()) {
      notifyWarning("Email is required");
      return;
    }
    if (!emailRegex.test(addCustomerData.email.trim())) {
      notifyWarning("Enter a valid email address");
      return;
    }
    if (!addCustomerData.password.trim()) {
      notifyWarning("Password is required");
      return;
    }
    if (!passwordRegex.test(addCustomerData.password.trim())) {
      notifyWarning(
        "Password must be at least 6 characters long and include a letter, a number, and a special character"
      );
      return;
    }
    if (
      addCustomerData.mobile_number.trim() &&
      !phoneRegex.test(addCustomerData.mobile_number.trim())
    ) {
      notifyWarning("Mobile Number should only contain numbers");
      return;
    }
    if (addCustomerData.password !== addCustomerData.confirm_password) {
      notifyWarning("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", addCustomerData.first_name);
    formData.append("middle_name", addCustomerData.middle_name);
    formData.append("last_name", addCustomerData.last_name);
    formData.append("user_name", addCustomerData.user_name);
    formData.append("email", addCustomerData.email);
    formData.append("mobile_number", addCustomerData.mobile_number);
    formData.append("dob", addCustomerData.dob);
    formData.append("address", addCustomerData.address);
    formData.append("password", addCustomerData.password);
    if (addCustomerData.profile) {
      formData.append("profile", addCustomerData.profile);
    }
    formData.append("status", addCustomerData.status);
    await axios
      .post(`${port}addcustomerdata`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/admin/customers");
        notifySuccess("Data Added Successfully");
      })
      .catch((error) => {
        console.log("Error adding admin data:", error);
      });
  };

  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
  };
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <div
          className="admin-dashboard-main-header"
          style={{ marginBottom: "24px" }}
        >
          <div>
            <h5>Add Customer</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/customers" className="breadcrumb-link active">
                Customer List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Add Customer</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/customers"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={(e) => saveAdminData(e)}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Customer
            </button>
          </div>
        </div>
        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="first-name">First Name</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="first_name"
                      value={addCustomerData.first_name}
                      onChange={handleChangeInput}
                      id="first-name"
                      placeholder="Type your first name here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      value={addCustomerData.middle_name}
                      onChange={handleChangeInput}
                      id="middle-name"
                      placeholder="Type your middle name here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name">Last Name</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="last_name"
                      id="last-name"
                      value={addCustomerData.last_name}
                      onChange={handleChangeInput}
                      placeholder="Type your last name here..."
                    />
                  </div>
                </div>
                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="username">UserName</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="user_name"
                      id="username"
                      value={addCustomerData.user_name}
                      onChange={handleChangeInput}
                      placeholder="Type your username here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={addCustomerData.email}
                      onChange={handleChangeInput}
                      placeholder="Type your email here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile_number"
                      id="mobile-number"
                      value={addCustomerData.mobile_number}
                      onChange={handleChangeInput}
                      placeholder="Type your Mobile Number here..."
                    />
                  </div>
                </div>
                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="date-of-birth">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={addCustomerData.dob}
                      onChange={handleChangeInput}
                      id="date-of-birth"
                      placeholder="Type your last name here..."
                    />
                  </div>
                  <div style={{ position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <span className="required_field">*</span>
                    <input
                      type={passwordViewOrHide ? "text" : "password"}
                      name="password"
                      id="password"
                      value={addCustomerData.password}
                      onChange={handleChangeInput}
                      placeholder="Password..."
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "4%",
                        top: "55%",
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
                  <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={addCustomerData.confirm_password}
                      onChange={handleChangeInput}
                      id="confirm-password"
                      placeholder="Confirm Password..."
                    />
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="address">Address</label>
                  <textarea
                    type="text"
                    rows="4"
                    style={{ marginTop: "5px" }}
                    name="address"
                    value={addCustomerData.address}
                    onChange={handleChangeInput}
                    id="address"
                    placeholder="Type your Address here..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Profile</h6>
              <div className="add-product-form-container">
                <label htmlFor="photo">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon">
                    <img
                      src={addCustomerData.profilePreview || default_profile}
                      alt="Selected Profile"
                      width="100"
                    />
                  </div>
                  <p className="add-product-upload-text">Click to add image</p>
                  <button
                    type="button"
                    className="add-product-upload-btn secondary-btn"
                    onClick={handleButtonClick}
                  >
                    Add Image
                  </button>
                  <input
                    type="file"
                    id="imageInputFile"
                    name="profile"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label htmlFor="status">Customer Status</label>
                <select
                  id="status"
                  name="status"
                  value={addCustomerData.status}
                  onChange={handleChangeInput}
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddNewCustomer;
