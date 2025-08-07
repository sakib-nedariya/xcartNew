import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { MdSave } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import axios from "axios";
import { notifyWarning, notifySuccess } from "../layout/ToastMessage";
import default_profile from "../../../assets/image/default_profile.png";
const port = import.meta.env.VITE_SERVER_URL;

const AddBrand = () => {
  const navigate = useNavigate();
  const [addBrandData, setAddBrandData] = useState({
    name: "",
    description: "",
    image: null,
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAddBrandData({
      ...addBrandData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddBrandData({
        ...addBrandData,
        image: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };

  const saveBrandData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;

    if (!addBrandData.name.trim()) {
      notifyWarning("Brand name is required");
      return;
    }
    if (!nameRegex.test(addBrandData.name.trim())) {
      notifyWarning("Brand name should only contain alphabets");
      return;
    }
    if (!addBrandData.description.trim()) {
      notifyWarning("Description is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", addBrandData.name);
    formData.append("description", addBrandData.description);
    if (addBrandData.image) {
      formData.append("image", addBrandData.image);
    }
    formData.append("status", addBrandData.status);
    await axios
      .post(`${port}addbranddata`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/admin/brand");
        notifySuccess("Data Added Successfully");
      })
      .catch((error) => {
        console.log("Error adding brand data:", error);
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
            <h5>Add Brand</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/brand" className="breadcrumb-link active">
                Brand List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Add Brand</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/brand"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={(e) => saveBrandData(e)}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Brand
            </button>
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
                  value={addBrandData.name}
                  onChange={handleChangeInput}
                  id="name"
                  placeholder="Type brand name here..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  type="text"
                  name="description"
                  value={addBrandData.description}
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
                    <img
                      src={addBrandData.profilePreview || default_profile}
                      alt="Selected Profile"
                      width="100"
                    />
                  </div>
                  <p className="add-product-upload-text">
                    Drag and drop image here, or click add image
                  </p>
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
                <label htmlFor="status">Brand Status</label>
                <select 
                id="status"
                name="status"
                  value={addBrandData.status}
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

export default AddBrand;
