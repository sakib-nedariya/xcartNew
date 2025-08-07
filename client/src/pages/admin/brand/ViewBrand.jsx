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

const ViewBrand = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState({
    name: "",
    description: "",
    image: null,
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBrandData({
      ...brandData,
      [name]: value,
    });
  };
  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddatawithid/${id}`);
      const fetchedData = res.data[0];
      setBrandData({
        ...fetchedData,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBrandData();
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
            <h5>View Brand</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/brand" className="breadcrumb-link active">
                Brand List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Brand</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/brand"
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
                <label htmlFor="name">Brand Name</label>
                <input
                  type="text"
                  name="name"
                  value={brandData.name}
                  onChange={handleChangeInput}
                  id="name"
                  placeholder="Type brand name here..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  type="text"
                  name="description"
                  value={brandData.description}
                  onChange={handleChangeInput}
                  placeholder="Type brand description here..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Thumbnail</h6>
              <div className="add-product-form-container">
                <label htmlFor="label-for-input-textarea photo">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon">
                    {brandData.image ? (
                      <img
                        src={`/upload/${brandData.image}`}
                        alt="Image"
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
                <label htmlFor="status">Brand Status</label>
                <select
                  id="status"
                  name="status"
                  value={brandData.status}
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

export default ViewBrand;
