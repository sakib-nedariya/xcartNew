import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { IoMdArrowDropright } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifyWarning } from "../layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const CreateCoupon = () => {
  const navigate = useNavigate();
  const [createCoupon, setCreateCoupon] = useState({
    coupon_code: "",
    discount: "",
    max_price: "",
    min_price: "",
    start_date: "",
    expiry_date: "",
    status: "1",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCreateCoupon({
      ...createCoupon,
      [name]: value,
    });
    console.log(createCoupon);
  };

  const saveCouponData = async (e) => {
    console.log(createCoupon.status);
    e.preventDefault();
    const discountRegex = /^[0-9]+$/;
    if (createCoupon.coupon_code.trim() == "") {
      notifyWarning("Coupon code is required");
      return;
    }
    if (createCoupon.discount.trim() == "") {
      notifyWarning("Discount is required");
      return;
    }
    if (!discountRegex.test(createCoupon.discount.trim())) {
      notifyWarning("Discount should only contain numbers");
      return;
    }
    if (createCoupon.max_price.trim() == "") {
      notifyWarning("Max price is required");
      return;
    }
    if (!discountRegex.test(createCoupon.max_price.trim())) {
      notifyWarning("Max Price should only contain numbers");
      return;
    }
    if (createCoupon.min_price.trim() == "") {
      notifyWarning("Min price is required");
      return;
    }
    if (!discountRegex.test(createCoupon.min_price.trim())) {
      notifyWarning("Min Price should only contain numbers");
      return;
    }
    if (createCoupon.start_date.trim() == "") {
      notifyWarning("Start date is required");
      return;
    }
    if (createCoupon.expiry_date.trim() == "") {
      notifyWarning("Expiry date is required");
      return;
    }
    try {
      const response = await axios.post(
        `${port}createcoupondata`,
        createCoupon
      );
      navigate("/admin/coupon");
    } catch (error) {
      console.error("Error in server.js: ", error);
    }
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
            <h5>Add Coupon</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/coupon" className="breadcrumb-link active">
                Coupon List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Add Coupon</span>
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
              onClick={(e) => saveCouponData(e)}
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
                  value={createCoupon.coupon_code}
                  onChange={handleChangeInput}
                  placeholder="Type coupon code here..."
                />
                <div className="coupon-code-input-max-min-price">
                  <div>
                    <label htmlFor="discount">Discount Percentage (%)</label>
                    <input
                      type="text"
                      id="discount"
                      name="discount"
                      value={createCoupon.discount}
                      onChange={handleChangeInput}
                      placeholder="Type product discount here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="maximum-price">Maximum Price</label>
                    <input
                      type="text"
                      id="maximum-price"
                      name="max_price"
                      value={createCoupon.max_price}
                      onChange={handleChangeInput}
                      placeholder="Type products max price here..."
                    />
                  </div>
                  <div>
                    <label htmlFor="minimum-price">Minimum Price</label>
                    <input
                      type="text"
                      id="minimum-price"
                      name="min_price"
                      value={createCoupon.min_price}
                      onChange={handleChangeInput}
                      placeholder="Type products min price here..."
                    />
                  </div>
                </div>
                <div className="coupon-code-start-expity-date">
                  <div>
                    <label htmlFor="start-date">Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={createCoupon.start_date}
                      onChange={handleChangeInput}
                      id="start-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={createCoupon.expiry_date}
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
                  value={createCoupon.status}
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

export default CreateCoupon;
