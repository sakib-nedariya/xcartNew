import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { MdSave } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { notifyWarning, notifySuccess } from "../layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // { file, preview }
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [productData, setProductData] = useState({
    brand_id: "",
    cate_id: "",
    slogan: "",
    name: "",
    description: "",
    existingImages: [],
    price: "",
    discount: "",
    memory: "",
    storage: "",
    status: "",
  });

  useEffect(() => {
    getBrandData();
    getCategoryData();
    getProductData();
  }, [id]);

  const getBrandData = async () => {
    try {
      const { data } = await axios.get(`${port}getbranddata`);
      setBrandData(data);
    } catch {}
  };

  const getCategoryData = async () => {
    try {
      const { data } = await axios.get(`${port}getcategorydata`);
      setCategoryData(data);
    } catch {}
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdatawithid/${id}`);
      const fetched = res.data[0];
      let imgs = [];
      try {
        imgs = JSON.parse(fetched.image);
        if (!Array.isArray(imgs)) imgs = [imgs];
      } catch {
        if (fetched.image) imgs = [fetched.image];
      }
      setProductData({ ...fetched, existingImages: imgs });
    } catch (err) {}
  };

  // Combine both existing and new images for unified drag
  const allImages = [
    ...productData.existingImages.map((img) => ({ type: "existing", data: img })),
    ...selectedFiles.map((file) => ({ type: "new", data: file })),
  ];

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedList = [...allImages];
    const [draggedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(dropIndex, 0, draggedItem);

    // Separate back into existing and new files
    const updatedExisting = updatedList
      .filter((i) => i.type === "existing")
      .map((i) => i.data);
    const updatedNew = updatedList
      .filter((i) => i.type === "new")
      .map((i) => i.data);

    setProductData((prev) => ({
      ...prev,
      existingImages: updatedExisting,
    }));
    setSelectedFiles(updatedNew);

    setDraggedIndex(null);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setSelectedFiles((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const item = allImages[index];
    if (item.type === "existing") {
      setProductData((p) => ({
        ...p,
        existingImages: p.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      const existingCount = productData.existingImages.length;
      const newIndex = index - existingCount;
      setSelectedFiles((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const saveProductData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fields = [
      "brand_id",
      "cate_id",
      "name",
      "slogan",
      "description",
      "price",
      "discount",
      "memory",
      "storage",
      "status",
    ];
    fields.forEach((key) => formData.append(key, productData[key] || ""));
    formData.append(
      "existingImages",
      JSON.stringify(productData.existingImages)
    );
    selectedFiles.forEach((f) => formData.append("images", f.file));

    try {
      await axios.put(`${port}editproductdata/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notifySuccess("Data Updated Successfully");
      navigate("/admin/product");
    } catch (err) {
      console.error(err);
    }
  };

  const handleButtonClick = () =>
    document.getElementById("imageInputFile").click();

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
            <h5>Edit Product</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/product" className="breadcrumb-link active">
                Product List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">Edit Product</span>
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
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChangeInput}
                />
                <label>Slogan</label>
                <input
                  type="text"
                  name="slogan"
                  value={productData.slogan}
                  onChange={handleChangeInput}
                />
                <label>Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Media</h6>
              <div className="add-product-form-container">
                <label htmlFor="imageInputFile">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon preview-grid">
                    {allImages.map((item, index) => (
                      <div
                        key={index}
                        className="image-preview-wrapper"
                        draggable
                        onDragStart={() => setDraggedIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index)}
                      >
                        <img
                          src={
                            item.type === "existing"
                              ? `/upload/${item.data}`
                              : item.data.preview
                          }
                          alt={`Preview ${index}`}
                          className="image-preview"
                        />
                        <RxCross2
                          className="remove-preview-button"
                          onClick={() => removeImage(index)}
                        />
                      </div>
                    ))}
                    {allImages.length === 0 && (
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
                <label>Base Price</label>
                <input
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleChangeInput}
                />
                <label>Discount (%)</label>
                <input
                  type="text"
                  name="discount"
                  value={productData.discount}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>

          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand & Category</h6>
              <div className="add-product-form-container">
                <label>Select Brand</label>
                <select
                  name="brand_id"
                  value={productData.brand_id}
                  onChange={handleChangeInput}
                >
                  <option value="">Select Brand</option>
                  {brandData.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <label>Select Category</label>
                <select
                  name="cate_id"
                  value={productData.cate_id}
                  onChange={handleChangeInput}
                >
                  <option value="">Select Category</option>
                  {categoryData.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Memory & Storage</h6>
              <div className="add-product-form-container">
                <label>Memory (RAM)</label>
                <input
                  type="text"
                  name="memory"
                  value={productData.memory}
                  onChange={handleChangeInput}
                />
                <label>Storage</label>
                <input
                  type="text"
                  name="storage"
                  value={productData.storage}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label>Product Status</label>
                <select
                  name="status"
                  value={productData.status}
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

export default EditProduct;
