import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
const port = import.meta.env.VITE_SERVER_URL;

const ViewAdmin = () => {
  const { id } = useParams();
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

  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);

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
            <h5>View Admin</h5>
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
              <span className="breadcrumb-text">View Admin</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/manage-admins"
              className="primary-btn dashboard-add-product-btn"
            >
              <IoArrowBackSharp /> Back
            </NavLink>
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
                      placeholder="Type your first name here..."
                      value={adminData.first_name}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      id="middle-name"
                      placeholder="Type your middle name here..."
                      value={adminData.middle_name}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name">Last Name</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="last_name"
                      id="last-name"
                      placeholder="Type your last name here..."
                      value={adminData.last_name}
                      disabled
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
                      placeholder="Type your username here..."
                      value={adminData.user_name}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <span className="required_field">*</span>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Type your email here..."
                      value={adminData.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile_number"
                      id="mobile-number"
                      placeholder="Type your Mobile Number here..."
                      value={adminData.mobile_number}
                      disabled
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
                      placeholder="Type your last name here..."
                      value={adminData.dob}
                      disabled
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
                      disabled
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
                      value={adminData.password}
                      disabled
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
                    {adminData.profile ? (
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
                  <input
                    type="file"
                    id="imageInputFile"
                    name="profile"
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
                  disabled
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

export default ViewAdmin;
