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

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_name: "",
    email: "",
    mobile_number: "",
    dob: "",
    password: "",
    confirm_password: "",
    profile: null,
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminData({
        ...adminData,
        profile: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };

  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);
  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
  };

  const getAdminData = async () => {
    try {
      const res = await axios.get(`${port}getadmindatawithid/${id}`);
      const fetchedData = res.data[0];

      setAdminData({
        ...fetchedData,
        dob: fetchedData.dob ? fetchedData.dob.split("T")[0] : "", // Format DOB correctly
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //edit data
  const saveAdminData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9_.-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^[0-9]+$/;

    if (!adminData.first_name.trim()) {
      notifyWarning("First name is required");
      return;
    }
    if (!nameRegex.test(adminData.first_name.trim())) {
      notifyWarning("First name should only contain alphabets");
      return;
    }
    if (!adminData.last_name.trim()) {
      notifyWarning("Last name is required");
      return;
    }
    if (!nameRegex.test(adminData.last_name.trim())) {
      notifyWarning("Last name should only contain alphabets");
      return;
    }
    if (
      adminData.middle_name.trim() &&
      !nameRegex.test(adminData.middle_name.trim())
    ) {
      notifyWarning("Middle name should only contain alphabets");
      return;
    }
    if (!adminData.user_name.trim()) {
      notifyWarning("Username is required");
      return;
    }
    if (!usernameRegex.test(adminData.user_name.trim())) {
      notifyWarning(
        "Username can only contain letters, numbers, underscores, dots, and hyphens"
      );
      return;
    }
    if (!adminData.email.trim()) {
      notifyWarning("Email is required");
      return;
    }
    if (!emailRegex.test(adminData.email.trim())) {
      notifyWarning("Enter a valid email address");
      return;
    }
    if (!adminData.password.trim()) {
      notifyWarning("Password is required");
      return;
    }
    if (!passwordRegex.test(adminData.password.trim())) {
      notifyWarning(
        "Password must be at least 6 characters long and include a letter, a number, and a special character"
      );
      return;
    }
    if (
      adminData.mobile_number.trim() &&
      !phoneRegex.test(adminData.mobile_number.trim())
    ) {
      notifyWarning("Mobile Number should only contain numbers");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", adminData.first_name);
    formData.append("middle_name", adminData.middle_name);
    formData.append("last_name", adminData.last_name);
    formData.append("user_name", adminData.user_name);
    formData.append("email", adminData.email);
    formData.append("mobile_number", adminData.mobile_number);
    formData.append("dob", adminData.dob);
    formData.append("password", adminData.password);
    formData.append("profile", adminData.profile);
    formData.append("status", adminData.status);
    console.log(adminData);
    await axios
      .put(`${port}editadmindata/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/admin/manage-admins");
          notifySuccess("Data Updated Successfully");
      })
      .catch((error) => {
        console.log("Error adding admin data:", error);
      });
  };

  useEffect(() => {
    getAdminData();
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
            <h5>Edit Admin</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link
                to="/admin/manage-admins"
                className="breadcrumb-link active"
              >
                Admin List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Admin</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/manage-admins"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={saveAdminData}
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
                      value={adminData.first_name}
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
                      value={adminData.middle_name}
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
                      value={adminData.last_name}
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
                      value={adminData.user_name}
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
                      value={adminData.email}
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
                      value={adminData.mobile_number}
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
                      value={adminData.dob}
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
                      value={adminData.password}
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
                    {adminData.profilePreview ? (
                      // Show the newly selected image preview
                      <img
                        src={adminData.profilePreview}
                        alt="Selected Profile"
                        width="100"
                      />
                    ) : adminData.profile ? (
                      // Show the existing profile image if available
                      <img
                        src={`/upload/${adminData.profile}`}
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
                  value={adminData.status}
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

export default EditAdmin;
