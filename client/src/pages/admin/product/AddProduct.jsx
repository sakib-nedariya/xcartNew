import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { IoMdArrowDropright } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import {
  notifyWarning,
  notifySuccess,
  notifyError,
} from "../layout/ToastMessage";
import default_profile from "../../../assets/image/default_profile.png";

const port = import.meta.env.VITE_SERVER_URL;

const AddProduct = () => {
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${port}getcategorydata`);
      setCategoryData(res.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const [addProductData, setAddProductData] = useState({
    brand_id: "",
    cate_id: "",
    slogan: "",
    name: "",
    description: "",
    image: [],
    profilePreview: [],
    price: "",
    discount: "",
    memory: "",
    storage: "",
    status: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAddProductData({
      ...addProductData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setAddProductData((prevData) => ({
      ...prevData,
      image: [...prevData.image, ...files],
      profilePreview: [
        ...prevData.profilePreview,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));
  };

  const removeImage = (index) => {
    setAddProductData((prevData) => {
      const updatedImages = [...prevData.image];
      const updatedPreviews = [...prevData.profilePreview];
      updatedImages.splice(index, 1);
      updatedPreviews.splice(index, 1);
      return {
        ...prevData,
        image: updatedImages,
        profilePreview: updatedPreviews,
      };
    });
  };

  const saveProductData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_id", addProductData.brand_id);
    formData.append("cate_id", addProductData.cate_id);
    formData.append("name", addProductData.name);
    formData.append("slogan", addProductData.slogan);
    formData.append("description", addProductData.description);
    formData.append("price", addProductData.price);
    formData.append("discount", addProductData.discount);
    formData.append("memory", addProductData.memory);
    formData.append("storage", addProductData.storage);
    formData.append("status", addProductData.status);

    if (addProductData.image && addProductData.image.length > 0) {
      addProductData.image.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      await axios.post(`${port}addproductdata`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/product");
      notifySuccess("Data Added Successfully");
    } catch (error) {
      console.error("Error adding product data:", error);
      notifyError("Failed to add product");
    }
  };

  useEffect(() => {
    getBrandData();
    getCategoryData();
  }, []);

  const handleButtonClick = () => {
    document.getElementById("imageInputFile").click();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedImages = [...addProductData.image];
    const updatedPreviews = [...addProductData.profilePreview];

    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    const [draggedPreview] = updatedPreviews.splice(draggedIndex, 1);

    updatedImages.splice(dropIndex, 0, draggedImage);
    updatedPreviews.splice(dropIndex, 0, draggedPreview);

    setAddProductData((prevData) => ({
      ...prevData,
      image: updatedImages,
      profilePreview: updatedPreviews,
    }));

    setDraggedIndex(null);
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
            <h5>Add Product</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/product" className="breadcrumb-link active">
                Product List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Add Product</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/product"
              className="cancel-btn dashboard-add-product-btn"
            >
              <HiXMark /> Cancel
            </NavLink>
            <button
              type="button"
              onClick={saveProductData}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Product
            </button>
          </div>
        </div>

        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <label htmlFor="product-name">Product Name</label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  value={addProductData.name}
                  onChange={handleChangeInput}
                  placeholder="Type product name here..."
                />
                <label htmlFor="product-slogan">Slogan</label>
                <input
                  type="text"
                  id="product-slogan"
                  name="slogan"
                  value={addProductData.slogan}
                  onChange={handleChangeInput}
                  placeholder="Type product slogan here..."
                />
                <label htmlFor="product-description">Description</label>
                <textarea
                  id="product-description"
                  name="description"
                  value={addProductData.description}
                  onChange={handleChangeInput}
                  placeholder="Type product description here..."
                ></textarea>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Media</h6>
              <div className="add-product-form-container">
                <label htmlFor="imageInputFile">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon preview-grid">
                    {addProductData.profilePreview.length > 0 ? (
                      addProductData.profilePreview.map((src, index) => (
                        <div
                          key={index}
                          className="image-preview-wrapper"
                          draggable
                          onDragStart={() => setDraggedIndex(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(index)}
                        >
                          <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="image-preview"
                          />
                          <RxCross2
                            className="remove-preview-button"
                            title="Remove"
                            onClick={() => removeImage(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <img
                        src={default_profile}
                        alt="Default Preview"
                        className="image-preview"
                        style={{ margin: "0 6px" }}
                      />
                    )}
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
                    name="images"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Pricing</h6>
              <div className="add-product-form-container">
                <label htmlFor="product-price">Base Price</label>
                <input
                  type="text"
                  id="product-price"
                  name="price"
                  value={addProductData.price}
                  onChange={handleChangeInput}
                  placeholder="Type base price here..."
                />
                <label htmlFor="product-discount">
                  Discount Percentage (%)
                </label>
                <input
                  type="text"
                  id="product-discount"
                  name="discount"
                  value={addProductData.discount}
                  onChange={handleChangeInput}
                  placeholder="Type discount percentage..."
                />
              </div>
            </div>
          </div>

          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand & Category</h6>
              <div className="add-product-form-container">
                <label htmlFor="brand">Select Brand</label>
                <select
                  id="brand"
                  name="brand_id"
                  value={addProductData.brand_id}
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
              <div className="add-product-form-container">
                <label htmlFor="category">Select Category</label>
                <select
                  id="category"
                  name="cate_id"
                  value={addProductData.cate_id}
                  onChange={handleChangeInput}
                >
                  <option value="">Select Category</option>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Memory & Storage</h6>
              <div className="add-product-form-container">
                <label htmlFor="memory">Memory (RAM)</label>
                <input
                  type="text"
                  id="memory"
                  name="memory"
                  value={addProductData.memory}
                  onChange={handleChangeInput}
                  placeholder="Memory"
                />
                <label htmlFor="storage">Storage</label>
                <input
                  type="text"
                  id="storage"
                  name="storage"
                  value={addProductData.storage}
                  onChange={handleChangeInput}
                  placeholder="Storage"
                />
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label htmlFor="status">Product Status</label>
                <select
                  id="status"
                  name="status"
                  value={addProductData.status}
                  onChange={handleChangeInput}
                >
                  <option value="1">Published</option>
                  <option value="2">Low Stock</option>
                  <option value="3">Draft</option>
                  <option value="0">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProduct;
