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

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandData({
        ...brandData,
        image: file,
        profilePreview: URL.createObjectURL(file),
      });
    }
  };
  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
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

  //edit data
  const saveBrandData = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;

    if (!brandData.name.trim()) {
      notifyWarning("Brand name is required");
      return;
    }
    if (!nameRegex.test(brandData.name.trim())) {
      notifyWarning("Brand name should only contain alphabets");
      return;
    }
    if (!brandData.description.trim()) {
      notifyWarning("Description is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", brandData.name);
    formData.append("description", brandData.description);
    formData.append("status", brandData.status);
    formData.append("image", brandData.image);
    console.log(brandData);
    await axios
      .put(`${port}editbrandData/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/admin/brand");
        notifySuccess("Data Updated Successfully");
      })
      .catch((error) => {
        console.log("Error adding brand data:", error);
      });
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
            <h5>Edit Brand</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/brand" className="breadcrumb-link active">
                Brand List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Brand</span>
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
              onClick={saveBrandData}
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
                    {brandData.profilePreview ? (
                      // Show the newly selected image preview
                      <img
                        src={brandData.profilePreview}
                        alt="Selected Profile"
                        width="100"
                      />
                    ) : brandData.image ? (
                      // Show the existing profile image if available
                      <img
                        src={`/upload/${brandData.image}`}
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

export default EditBrand;
