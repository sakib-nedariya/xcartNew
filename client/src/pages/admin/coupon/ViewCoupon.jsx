import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
const port = import.meta.env.VITE_SERVER_URL;

const ViewCoupon = () => {
  const { id } = useParams();
  const [couponData, setCouponData] = useState({
    coupon_code: "",
    discount: "",
    max_price: "",
    min_price: "",
    start_date: "",
    expiry_date: "",
    status: 1,
  });

  const getCouponData = async () => {
    try {
      const res = await axios.get(`${port}getcoupondatawithid/${id}`);
      const data = res.data[0];
  
      setCouponData({
        ...data,
        start_date: data.start_date ? data.start_date.split("T")[0] : "",
        expiry_date: data.expiry_date ? data.expiry_date.split("T")[0] : "",
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    getCouponData();
  }, [id]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <div className="admin-dashboard-main-header" style={{ marginBottom: "24px" }}>
          <div>
            <h5>View Coupon</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">Dashboard</Link>
              <IoMdArrowDropright />
              <Link to="/admin/coupon" className="breadcrumb-link active">Coupon List</Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Coupon</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink to="/admin/coupon" className="primary-btn dashboard-add-product-btn">
              <IoArrowBackSharp /> Back
            </NavLink>
          </div>
        </div>
        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <label>Coupon Code</label>
                <input type="text" value={couponData.coupon_code} disabled />
                <div className="coupon-code-input-max-min-price">
                  <div>
                    <label htmlFor="discount">Discount Type</label>
                    <select disabled>
                      <option value="percentage">Percentage</option>
                      <option value="rupees">Rupees</option>
                    </select>
                  </div>
                  <div>
                    <label>Discount Percentage (%)</label>
                    <input type="text" value={couponData.discount} disabled />
                  </div>
                </div>
                <div className="coupon-code-input-max-min-price">
                  <div>
                    <label>Maximum Price</label>
                    <input type="text" value={couponData.max_price} disabled />
                  </div>
                  <div>
                    <label>Minimum Price</label>
                    <input type="text" value={couponData.min_price} disabled />
                  </div>
                </div>
                <div className="coupon-code-start-expity-date">
                  <div>
                    <label htmlFor="start-date">Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={couponData.start_date}
                      id="start-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={couponData.expiry_date}
                      id="expiry-date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label>Coupon Status</label>
                <select value={couponData.status} disabled>
                  <option value="1">Active</option>
                  <option value="0">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewCoupon;
