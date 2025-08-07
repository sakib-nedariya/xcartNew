import React, { useEffect, useState } from "react";
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

const AddCategory = () => {
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState([]);
  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [addCategoryData, setAddCategoryData] = useState({
    name: "",
    brand_id: "",
    description: "",
    image: null,
    status: 1,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAddCategoryData({
      ...addCategoryData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddCategoryData({
        ...addCategoryData,
        image: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };

  const saveCategoryData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;

    if (!addCategoryData.name.trim()) {
      notifyWarning("Category name is required");
      return;
    }
    if (!nameRegex.test(addCategoryData.name.trim())) {
      notifyWarning("Category name should only contain alphabets");
      return;
    }
    if (!addCategoryData.description.trim()) {
      notifyWarning("Description is required");
      return;
    }
    if (!addCategoryData.brand_id.trim()) {
      notifyWarning("Brand is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", addCategoryData.name);
    formData.append("description", addCategoryData.description);
    formData.append("brand_id", addCategoryData.brand_id);
    if (addCategoryData.image) {
      formData.append("image", addCategoryData.image);
    }
    formData.append("status", addCategoryData.status);
    console.log(addCategoryData);
    await axios
      .post(`${port}addcategorydata`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/admin/category");
        notifySuccess("Data Added Successfully");
      })
      .catch((error) => {
        console.log("Error adding category data:", error);
      });
  };
  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
  };

  useEffect(() => {
    getBrandData();
  }, []);

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
            <h5>Add Category</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/category" className="breadcrumb-link active">
                Category List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Add Category</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/category"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={(e) => saveCategoryData(e)}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Category
            </button>
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
                  value={addCategoryData.name}
                  onChange={handleChangeInput}
                  id="name"
                  name="name"
                  placeholder="Type category name here..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={addCategoryData.description}
                  onChange={handleChangeInput}
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
                    <img
                      src={addCategoryData.profilePreview || default_profile}
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
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand</h6>
              <div className="add-product-form-container">
                <label htmlFor="brand_id">Select Brand</label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={addCategoryData.brand_id}
                  onChange={handleChangeInput}
                >
                  <option value="">Select Brand</option>
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
                <select
                  id="status"
                  name="status"
                  value={addCategoryData.status}
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

export default AddCategory;
