import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
const port = import.meta.env.VITE_SERVER_URL;

const ViewCustomer = () => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_name: "",
    email: "",
    mobile_number: "",
    dob: "",
    address: "",
    password: "",
    profile: null,
    status: 1,
  });

  const [passwordViewOrHide, setPasswordViewOrHide] = useState(false);

  const getCustomerData = async () => {
    try {
      const res = await axios.get(`${port}getcustomerdatawithid/${id}`);
      const fetchedData = res.data[0];
      setCustomerData({
        ...fetchedData,
        dob: fetchedData.dob ? fetchedData.dob.split("T")[0] : "",
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
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
            <h5>View Customer</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/customers" className="breadcrumb-link active">
                Customer List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Customer</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/customers"
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
                      value={customerData.first_name}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      id="middle-name"
                      value={customerData.middle_name}
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
                      value={customerData.last_name}
                      disabled
                    />
                  </div>
                </div>
                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="username">UserName</label>
                    <input
                      type="text"
                      name="user_name"
                      id="username"
                      value={customerData.user_name}
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
                      value={customerData.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile_number"
                      id="mobile-number"
                      value={customerData.mobile_number}
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
                      value={customerData.dob}
                      disabled
                    />
                  </div>
                  <div style={{ position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <input
                      type={passwordViewOrHide ? "text" : "password"}
                      name="password"
                      id="password"
                      value={customerData.password}
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
                      onClick={() => setPasswordViewOrHide(!passwordViewOrHide)}
                    >
                      {passwordViewOrHide ? <FaEyeSlash /> : <FaEye />}
                    </span>
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
                    {customerData.profile ? (
                      <img
                        src={`/upload/${customerData.profile}`}
                        alt="Profile"
                        width="100"
                      />
                    ) : (
                      <img
                        src={default_profile}
                        alt="Default Profile"
                        width="100"
                      />
                    )}
                  </div>
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
                  value={customerData.status}
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

export default ViewCustomer;
