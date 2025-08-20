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

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState({
    coupon_code: "",
    discount_type: "percentage",
    discount: "",
    max_price: "",
    min_price: "",
    start_date: "",
    expiry_date: "",
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCouponData({
      ...couponData,
      [name]: value,
    });
  };

 
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

  //edit data
  const saveCouponData = async (e) => {
    e.preventDefault();
    const discountRegex = /^[0-9]+$/;

    if (String(couponData.coupon_code).trim() === "") {
        notifyWarning("Coupon code is required");
        return;
    }
    if (String(couponData.discount).trim() === "") {
        notifyWarning("Discount is required");
        return;
    }
    if (!discountRegex.test(String(couponData.discount).trim())) {
        notifyWarning("Discount should only contain numbers");
        return;
    }
    if (String(couponData.max_price).trim() === "") {
        notifyWarning("Max price is required");
        return;
    }
    if (!discountRegex.test(String(couponData.max_price).trim())) {
        notifyWarning("Max Price should only contain numbers");
        return;
    }
    if (String(couponData.min_price).trim() === "") {
        notifyWarning("Min price is required");
        return;
    }
    if (!discountRegex.test(String(couponData.min_price).trim())) {
        notifyWarning("Min Price should only contain numbers");
        return;
    }
    if (String(couponData.start_date).trim() === "") {
        notifyWarning("Start date is required");
        return;
    }
    if (String(couponData.expiry_date).trim() === "") {
        notifyWarning("Expiry date is required");
        return;
    }
        try {
            const response = await axios.put(
              `${port}editcouponData/${id}`,
              couponData
            );
            notifySuccess("Coupon updated successfully");
            navigate("/admin/coupon");
          } catch (error) {
            console.error("Error in server.js: ", error);
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
        <div
          className="admin-dashboard-main-header"
          style={{ marginBottom: "24px" }}
        >
          <div>
            <h5>Edit Coupon</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link
                to="/admin/coupon"
                className="breadcrumb-link active"
              >
                Coupon List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Coupon</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/coupon"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={saveCouponData}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Coupon
            </button>
          </div>
        </div>
        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <label htmlFor="coupon-code">Coupon Code</label>
                <input
                  type="text"
                  id="coupon-code"
                  name="coupon_code"
                  value={couponData.coupon_code}
                  onChange={handleChangeInput}
                  placeholder="Type coupon code here..."
                />
                <div className="coupon-code-input-max-min-price grid">
                  <div>
                    <label htmlFor="discount_type">Discount Type</label>
                    <select
                      id="discount_type"
                      name="discount_type"
                      value={couponData.discount_type}
                      onChange={handleChangeInput}
                    >
                      <option value="percentage">Percentage</option>
                      <option value="rupees">Rupees</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="discount">
                      {couponData.discount_type === "percentage"
                        ? "Discount Percentage (%)"
                        : "Discount Amount (₹)"}
                    </label>
                    <input
                      type="text"
                      id="discount"
                      name="discount"
                      value={couponData.discount}
                      onChange={handleChangeInput}
                      placeholder="Type product discount here..."
                    />
                  </div>
                </div>
                <div className="coupon-code-input-max-min-price grid">
                  <div>
                    <label htmlFor="minimum-price">Minimum Price</label>
                    <input
                      type="text"
                      id="minimum-price"
                      name="min_price"
                      value={couponData.min_price}
                      onChange={handleChangeInput}
                      placeholder="Type products min price here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="maximum-price">Maximum Price</label>
                    <input
                      type="text"
                      id="maximum-price"
                      name="max_price"
                      value={couponData.max_price}
                      onChange={handleChangeInput}
                      placeholder="Type products max price here..."
                    />
                  </div>
                  
                </div>
                <div className="coupon-code-start-expity-date grid">
                  <div>
                    <label htmlFor="start-date">Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={couponData.start_date}
                      onChange={handleChangeInput}
                      id="start-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={couponData.expiry_date}
                      onChange={handleChangeInput}
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
                <label htmlFor="status">Coupon Code Status</label>
                <select
                  id="status"
                  name="status"
                  value={couponData.status}
                  onChange={handleChangeInput}
                >
                  <option value="1">Active</option>
                  <option value="0">Disable</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditCoupon;