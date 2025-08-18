import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { IoMdArrowDropright } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { notifySuccess, notifyError } from "../layout/ToastMessage";
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
    discount: "",
    memory: "",
    storage: "",
    price: "",
    status: "",
    variants: [],
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

  const handleAddVariant = () => {
    const price = parseFloat(addProductData.price);
    const discount = parseFloat(addProductData.discount) || 0;
    const finalPrice = Math.ceil(price - (price * discount) / 100);

    setAddProductData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          memory: prev.memory,
          storage: prev.storage,
          price: prev.price,
          discount: prev.discount,
          final_price: finalPrice,
        },
      ],
      memory: "",
      storage: "",
      price: "",
      discount: "",
    }));
  };

  const removeVariant = (index) => setAddProductData((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
  }));

  const saveProductData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_id", addProductData.brand_id);
    formData.append("cate_id", addProductData.cate_id);
    formData.append("name", addProductData.name);
    formData.append("slogan", addProductData.slogan);
    formData.append("description", addProductData.description);
    formData.append("status", addProductData.status);
    formData.append("variants", JSON.stringify(addProductData.variants));

    if (addProductData.image.length > 0) {
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
            {/* General Info */}
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={addProductData.name}
                  onChange={handleChangeInput}
                  placeholder="Type product name here..."
                />
                <label>Slogan</label>
                <input
                  type="text"
                  name="slogan"
                  value={addProductData.slogan}
                  onChange={handleChangeInput}
                  placeholder="Type product slogan here..."
                />
                <label>Description</label>
                <textarea
                  name="description"
                  value={addProductData.description}
                  onChange={handleChangeInput}
                  placeholder="Type product description here..."
                ></textarea>
              </div>
            </div>

            {/* Media */}
            <div className="dashboard-add-content-card">
              <h6>Media</h6>
              <div className="add-product-form-container">
                <label>Photo</label>
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

            {/* Variants */}
            <div className="dashboard-add-content-card">
              <div
                className="product-variant-add-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h6 style={{ paddingBottom: "0px" }}>
                  Memory, Storage, Price & Discount
                </h6>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleAddVariant}
                >
                  Save
                </button>
              </div>
              <div className="add-product-form-container product-container-grid">
                <div>
                  <label>Memory (RAM)</label>
                  <input
                    type="text"
                    name="memory"
                    value={addProductData.memory}
                    onChange={handleChangeInput}
                    placeholder="Memory"
                  />
                </div>
                <div>
                  <label>Storage</label>
                  <input
                    type="text"
                    name="storage"
                    value={addProductData.storage}
                    onChange={handleChangeInput}
                    placeholder="Storage"
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={addProductData.price}
                    onChange={handleChangeInput}
                    placeholder="Price"
                  />
                </div>
                <div>
                  <label>Discount (%)</label>
                  <input
                    type="text"
                    name="discount"
                    value={addProductData.discount}
                    onChange={handleChangeInput}
                    placeholder="Discount"
                  />
                </div>
              </div>

              {addProductData.variants.length > 0 && (
                <div className="dashboard-table-container inner-add-product-variants">
                  <table>
                    <thead>
                      <tr>
                        <th>Memory</th>
                        <th>Storage</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Final Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addProductData.variants.map((v, index) => (
                        <tr key={index}>
                          <td>{v.memory}</td>
                          <td>{v.storage}</td>
                          <td>{v.price}</td>
                          <td>{v.discount}</td>
                          <td>{v.final_price}</td>
                          <td className="inner-product-variants-remove">
                            <MdDeleteForever
                              type="button"
                              title="Remove"
                              onClick={() => removeVariant(index)}
                              style={{ fontSize: "22px", cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="dashboard-add-content-right-side">
            {/* Brand & Category */}
            <div className="dashboard-add-content-card">
              <h6>Brand & Category</h6>
              <div className="add-product-form-container">
                <label>Select Brand</label>
                <select
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
                <label>Select Category</label>
                <select
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

            {/* Status */}
            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label>Product Status</label>
                <select
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