import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { notifyWarning, notifySuccess } from "../layout/ToastMessage";
const port = import.meta.env.VITE_SERVER_URL;

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCutsomerData] = useState({
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
    setCutsomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setCutsomerData({
        ...customerData,
        profile: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };

  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);
  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
  };

  const getCustomerData = async () => {
    try {
      const res = await axios.get(`${port}getcustomerdatawithid/${id}`);
      const fetchedData = res.data[0];

      setCutsomerData({
        ...fetchedData,
        dob: fetchedData.dob ? fetchedData.dob.split("T")[0] : "", // Format DOB correctly
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //edit data
  const saveCustomerData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9_.-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^[0-9]+$/;

    if (!customerData.first_name.trim()) {
      notifyWarning("First name is required");
      return;
    }
    if (!nameRegex.test(customerData.first_name.trim())) {
      notifyWarning("First name should only contain alphabets");
      return;
    }
    if (!customerData.last_name.trim()) {
      notifyWarning("Last name is required");
      return;
    }
    if (!nameRegex.test(customerData.last_name.trim())) {
      notifyWarning("Last name should only contain alphabets");
      return;
    }
    if (
       customerData.middle_name.trim() &&
      !nameRegex.test(customerData.middle_name.trim())
    ) {
      notifyWarning("Middle name should only contain alphabets");
      return;
    }
    if (!customerData.user_name.trim()) {
      notifyWarning("Username is required");
      return;
    }
    if (!usernameRegex.test(customerData.user_name.trim())) {
      notifyWarning(
        "Username can only contain letters, numbers, underscores, dots, and hyphens"
      );
      return;
    }
    if (!customerData.email.trim()) {
      notifyWarning("Email is required");
      return;
    }
    if (!emailRegex.test(customerData.email.trim())) {
      notifyWarning("Enter a valid email address");
      return;
    }
    if (!customerData.password.trim()) {
      notifyWarning("Password is required");
      return;
    }
    if (!passwordRegex.test(customerData.password.trim())) {
      notifyWarning(
        "Password must be at least 6 characters long and include a letter, a number, and a special character"
      );
      return;
    }
    if (
       customerData.mobile_number.trim() &&
      !phoneRegex.test(customerData.mobile_number.trim())
    ) {
      notifyWarning("Mobile Number should only contain numbers");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", customerData.first_name);
    formData.append("middle_name", customerData.middle_name);
    formData.append("last_name", customerData.last_name);
    formData.append("user_name", customerData.user_name);
    formData.append("email", customerData.email);
    formData.append("mobile_number", customerData.mobile_number);
    formData.append("dob", customerData.dob);
    formData.append("password", customerData.password);
    formData.append("profile", customerData.profile);
    formData.append("status", customerData.status);
    console.log(customerData);
    await axios
      .put(`${port}editcustomerData/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/admin/customers");
          notifySuccess("Data Updated Successfully");
      })
      .catch((error) => {
        console.log("Error adding admin data:", error);
      });
  };

  useEffect(() => {
    getCustomerData();
  }, [id]);

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
            <h5>Edit Customer</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link
                to="/admin/customers"
                className="breadcrumb-link active"
              >
                Customer List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Customer</span>
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
              onClick={saveCustomerData}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Admin
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
                      id="first-name"
                      value={customerData.first_name}
                      onChange={handleChangeInput}
                      placeholder="Type your first name here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      id="middle-name"
                      value={customerData.middle_name}
                      onChange={handleChangeInput}
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
                      value={customerData.last_name}
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
                      value={customerData.user_name}
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
                      value={customerData.email}
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
                      value={customerData.mobile_number}
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
                      id="date-of-birth"
                      value={customerData.dob}
                      onChange={handleChangeInput}
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
                      placeholder="Password..."
                      value={customerData.password}
                      onChange={handleChangeInput}
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
                    value={customerData.address}
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
                    {customerData.profilePreview ? (
                      // Show the newly selected image preview
                      <img
                        src={customerData.profilePreview}
                        alt="Selected Profile"
                        width="100"
                      />
                    ) : customerData.profile ? (
                      // Show the existing profile image if available
                      <img
                        src={`/upload/${customerData.profile}`}
                        alt="Selected Profile"
                        width="100"
                      />
                    ) : (
                      // Show default profile image if no profile is set
                      <img
                        src={default_profile}
                        alt="Default Profile"
                        width="100"
                      />
                    )}
                  </div>
                  <p className="add-product-upload-text">Click to edit image</p>
                  <button
                    type="button"
                    className="add-product-upload-btn secondary-btn"
                    onClick={handleButtonClick}
                  >
                    Edit Image
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
                <label htmlFor="status">Admin Status</label>
                <select
                  id="status"
                  name="status"
                  value={customerData.status}
                  onChange={handleChangeInput}
                >
                  <option value="1">Active</option>
                  <option value="0">Blocked</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditCustomer;
