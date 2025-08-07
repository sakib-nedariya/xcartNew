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

const ViewCategory = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState({
    brand_id: "",
    name: "",
    description: "",
    image: null,
    status: 1,
  });

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${port}getcategorydatawithid/${id}`);
      const fetchedData = res.data[0];
      setCategoryData({
        ...fetchedData,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
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
            <h5>View Category</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/category" className="breadcrumb-link active">
                Category List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Category</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/category"
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
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  value={categoryData.name}
                  id="name"
                  name="name"
                  placeholder="Type category name here..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={categoryData.description}
                  name="description"
                  placeholder="Type category description here..."
                ></textarea>
              </div>
            </div>
            <div className="dashboard-add-content-card">
              <h6>Thumbnail</h6>
              <div className="add-product-form-container">
                <label htmlFor="label-for-input-textarea photo">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon">
                    {categoryData.image ? (
                      <img
                        src={`/upload/${categoryData.image}`}
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
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand</h6>
              <div className="add-product-form-container">
                <label htmlFor="brand_id">Selected Brand</label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={categoryData.brand_id}
                  disabled 
                >
                  {brandData.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label htmlFor="status">Category Status</label>
                <select id="status" name="status" value={categoryData.status} disabled >
                  <option value={1}>Active</option>
                  <option value={0}>Disable</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewCategory;
