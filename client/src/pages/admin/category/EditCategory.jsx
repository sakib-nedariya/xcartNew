import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { MdSave } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { notifyWarning, notifySuccess } from "../layout/ToastMessage";
const port = import.meta.env.VITE_SERVER_URL;

const EditCategory = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState([]);
  const navigate = useNavigate();
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData({
        ...categoryData,
        image: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };
  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
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

  //edit data
  const saveCategoryData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;

    if (!categoryData.name.trim()) {
      notifyWarning("Category name is required");
      return;
    }
    if (!nameRegex.test(categoryData.name.trim())) {
      notifyWarning("Category name should only contain alphabets");
      return;
    }
    if (!categoryData.description.trim()) {
      notifyWarning("Description is required");
      return;
    }
    if (!categoryData.brand_id || categoryData.brand_id === "") {
        notifyWarning("Brand is required");
        return;
      }      
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);
    formData.append("brand_id", categoryData.brand_id);
    formData.append("status", categoryData.status);
    formData.append("image", categoryData.image);
    console.log(categoryData);
    await axios
      .put(`${port}editcategoryData/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/admin/category");
        notifySuccess("Data Updated Successfully");
      })
      .catch((error) => {
        console.log("Error adding category data:", error);
      });
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
            <h5>Edit Category</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/category" className="breadcrumb-link active">
                Category List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Category</span>
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
              onClick={saveCategoryData}
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
                  value={categoryData.name}
                  onChange={handleChangeInput}
                  id="name"
                  name="name"
                  placeholder="Type category name here..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={categoryData.description}
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
                    {categoryData.profilePreview ? (
                      // Show the newly selected image preview
                      <img
                        src={categoryData.profilePreview}
                        alt="Selected Profile"
                        width="100"
                      />
                    ) : categoryData.image ? (
                      // Show the existing profile image if available
                      <img
                        src={`/upload/${categoryData.image}`}
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
          </div>
          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand</h6>
              <div className="add-product-form-container">
                <label htmlFor="brand_id">Select Brand</label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={categoryData.brand_id}
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
                  value={categoryData.status}
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

export default EditCategory;
