import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { MdSave, MdDeleteForever } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import { FaPencil } from "react-icons/fa6";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { notifyError, notifySuccess } from "../layout/ToastMessage";

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
    status: "",
  });

  // ---------- VARIANTS ----------
  const [variants, setVariants] = useState([]);
  const [variantForm, setVariantForm] = useState({
    memory: "",
    storage: "",
    price: "",
    discount: "",
    final_price: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ---------- LOAD ----------
  useEffect(() => {
    getBrandData();
    getCategoryData();
    getProductData();
    getVariants();
  }, [id]);

  const getBrandData = async () => {
    try {
      const { data } = await axios.get(`${port}getbranddata`);
      setBrandData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategoryData = async () => {
    try {
      const { data } = await axios.get(`${port}getcategorydata`);
      setCategoryData(data);
    } catch (e) {
      console.error(e);
    }
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

      setProductData({
        brand_id: String(fetched.brand_id ?? ""),
        cate_id: String(fetched.cate_id ?? ""),
        slogan: fetched.slogan ?? "",
        name: fetched.name ?? "",
        description: fetched.description ?? "",
        status: String(fetched.status ?? "1"),
        existingImages: imgs,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getVariants = async () => {
    try {
      const { data } = await axios.get(`${port}product/${id}/variants`);
      setVariants(data || []);
    } catch (e) {
      console.error("Error get variants: ", e);
    }
  };

  // ---------- IMAGES ----------
  const allImages = useMemo(
    () => [
      ...productData.existingImages.map((img) => ({
        type: "existing",
        data: img,
      })),
      ...selectedFiles.map((file) => ({ type: "new", data: file })),
    ],
    [productData.existingImages, selectedFiles]
  );

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedList = [...allImages];
    const [draggedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(dropIndex, 0, draggedItem);

    const updatedExisting = updatedList
      .filter((i) => i.type === "existing")
      .map((i) => i.data);
    const updatedNew = updatedList
      .filter((i) => i.type === "new")
      .map((i) => i.data);

    setProductData((prev) => ({ ...prev, existingImages: updatedExisting }));
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
      setProductData((p) => {
        const copy = [...p.existingImages];
        copy.splice(index, 1);
        return { ...p, existingImages: copy };
      });
    } else {
      const existingCount = productData.existingImages.length;
      const newIndex = index - existingCount;
      setSelectedFiles((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // ---------- PRODUCT SAVE ----------
  const saveProductInfo = async () => {
    const formData = new FormData();
    const fields = [
      "brand_id",
      "cate_id",
      "name",
      "slogan",
      "description",
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
      notifySuccess("Product updated");
      navigate("/admin/product");
    } catch (err) {
      console.error(err);
      notifyError("Update failed");
    }
  };

  // ---------- VARIANT FUNCTIONS ----------
  const handleVariantFormChange = (e) => {
    const { name, value } = e.target;
    setVariantForm((p) => ({ ...p, [name]: value }));
  };

  const resetVariantForm = () => {
    setVariantForm({ memory: "", storage: "", price: "", discount: "", final_price: "" });
    setEditingId(null);
  };

  const saveVariant = async () => {
    const { memory, storage, price, discount } = variantForm;
    if (!memory || !storage || !price) {
      notifyError("Memory, storage, and price are required");
      return;
    }

    const finalPrice = Math.ceil(price - (price * (discount || 0) / 100));

    if (editingId === null) {
      try {
        const { data } = await axios.post(`${port}product/${id}/variants`, {
          memory,
          storage,
          price,
          discount: discount || 0,
          final_price: finalPrice,
        });
        setVariants((prev) => [...prev, data]);
        resetVariantForm();
        notifySuccess("Variant added");
      } catch (e) {
        console.error(e);
        notifyError("Add variant failed");
      }
    } else {
      try {
        await axios.put(`${port}variants/${editingId}`, {
          memory,
          storage,
          price,
          discount: discount || 0,
          final_price: finalPrice,
        });
        setVariants((prev) =>
          prev.map((v) =>
            v.id === editingId
              ? { ...v, memory, storage, price, discount, final_price: finalPrice }
              : v
          )
        );
        resetVariantForm();
        notifySuccess("Variant updated");
      } catch (e) {
        console.error(e);
        notifyError("Update variant failed");
      }
    }
  };

  const startEditVariant = (row) => {
    setEditingId(row.id);
    setVariantForm({
      memory: row.memory ?? "",
      storage: row.storage ?? "",
      price: String(row.price ?? ""),
      discount: String(row.discount ?? ""),
      final_price: String(row.final_price ?? ""),
    });
  };

  const deleteVariant = async (variantId) => {
    try {
      await axios.delete(`${port}variants/${variantId}`);
      setVariants((prev) => prev.filter((v) => v.id !== variantId));
      notifySuccess("Variant deleted");
    } catch (e) {
      console.error(e);
      notifyError("Delete variant failed");
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
              <Link
                to="/admin/dashboard"
                className="breadcrumb-link active"
              >
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link
                to="/admin/product"
                className="breadcrumb-link active"
              >
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
              onClick={saveProductInfo}
              className="primary-btn dashboard-add-product-btn"
            >
              <MdSave /> Save Product
            </button>
          </div>
        </div>

        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            {/* General */}
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <label>Product Name</label>
                <input
                  name="name"
                  value={productData.name}
                  onChange={handleChangeInput}
                />
                <label>Slogan</label>
                <input
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

            {/* Media */}
            <div className="dashboard-add-content-card">
              <h6>Media</h6>
              <div className="add-product-form-container">
                <label htmlFor="imageInputFile">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon preview-grid">
                    {allImages.length > 0 ? (
                      allImages.map((item, index) => (
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
                <div style={{ display: "flex", gap: "10px" }}>
                  {editingId && (
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={resetVariantForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={saveVariant}
                  >
                    {editingId ? "Save Changes" : "Add Variant"}
                  </button>
                </div>
              </div>

              <div className="add-product-form-container product-container-grid">
                <div>
                  <label>Memory (RAM)</label>
                  <input
                    name="memory"
                    value={variantForm.memory}
                    onChange={handleVariantFormChange}
                  />
                </div>
                <div>
                  <label>Storage</label>
                  <input
                    name="storage"
                    value={variantForm.storage}
                    onChange={handleVariantFormChange}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    name="price"
                    value={variantForm.price}
                    onChange={handleVariantFormChange}
                  />
                </div>
                <div>
                  <label>Discount (%)</label>
                  <input
                    name="discount"
                    value={variantForm.discount}
                    onChange={handleVariantFormChange}
                  />
                </div>
              </div>

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
                    {variants.length > 0 ? (
                      variants.map((v) => (
                        <tr key={v.id}>
                          <td>{v.memory}</td>
                          <td>{v.storage}</td>
                          <td>{v.price}</td>
                          <td>{v.discount}</td>
                          <td>{v.final_price}</td>
                          <td
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
                            <FaPencil
                              style={{ cursor: "pointer", fontSize: "16px" }}
                              title="Edit"
                              onClick={() => startEditVariant(v)}
                            />
                            <MdDeleteForever
                              style={{ fontSize: "20px", cursor: "pointer" }}
                              title="Remove"
                              onClick={() => deleteVariant(v.id)}
                            />
                            
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", opacity: 0.7 }}>
                          No variants yet. Add one above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side */}
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