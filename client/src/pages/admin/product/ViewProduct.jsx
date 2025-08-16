import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import default_profile from "../../../assets/image/default_profile.png";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const port = import.meta.env.VITE_SERVER_URL;

const ViewProduct = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [variants, setVariants] = useState([]);
  const [productData, setProductData] = useState({
    brand_id: "",
    cate_id: "",
    slogan: "",
    name: "",
    description: "",
    image: [],
    price: "",
    discount: "",
    memory: "",
    storage: "",
    status: "",
  });

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

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdatawithid/${id}`);
      const fetchedData = res.data[0];

      let images = [];
      if (Array.isArray(fetchedData.image)) {
        images = fetchedData.image;
      } else {
        try {
          images = JSON.parse(fetchedData.image);
        } catch {
          images = [];
        }
      }

      setProductData({
        ...fetchedData,
        image: images,
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getVariants = async () => {
    try {
      const res = await axios.get(`${port}product/${id}/variants`);
      setVariants(res.data || []);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  useEffect(() => {
    getBrandData();
    getCategoryData();
    getProductData();
    getVariants();
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
            <h5>View Product</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/product" className="breadcrumb-link active">
                Product List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Product</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/product"
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
                <label htmlFor="product-name">Product Name</label>
                <input type="text" value={productData.name} readOnly />

                <label htmlFor="product-slogan">Slogan</label>
                <input type="text" value={productData.slogan} readOnly />

                <label htmlFor="product-description">Description</label>
                <textarea value={productData.description} readOnly />
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Media</h6>
              <div className="add-product-form-container">
                <label>Images</label>
                <div className="add-product-upload-container">
                  <div
                    className="add-product-upload-icon preview-grid"
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {productData.image.length > 0 ? (
                      productData.image.map((img, index) => (
                        <img
                          key={index}
                          src={`/upload/${img}`}
                          alt={`Product ${index}`}
                          className="image-preview"
                        />
                      ))
                    ) : (
                      <img
                        src={default_profile}
                        alt="Default"
                        className="image-preview"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Memory, Storage, Price & Discount</h6>
              <div className="dashboard-table-container inner-add-product-variants">
                <table>
                  <thead>
                    <tr>
                      <th>Memory</th>
                      <th>Storage</th>
                      <th>Price</th>
                      <th>Discount</th>
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          style={{ textAlign: "center", opacity: 0.7 }}
                        >
                          No variants available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Brand & Category</h6>
              <div className="add-product-form-container">
                <label>Brand</label>
                <select value={productData.brand_id} disabled>
                  {brandData.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-product-form-container">
                <label>Category</label>
                <select value={productData.cate_id} disabled>
                  {categoryData.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label>Status</label>
                <select value={productData.status} disabled>
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

export default ViewProduct;
