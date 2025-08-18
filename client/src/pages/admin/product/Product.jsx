import React, { useEffect, useState, useRef } from "react";
import { IoIosEye } from "react-icons/io";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import axios from "axios";
import Breadcrumb from "../layout/Breadcrumb";
import Pagination from "../../../Components/Pagination";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Components/DeleteModal";
import "../../../assets/css/admin/product.css";
import { notifySuccess } from "../layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const Product = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [variants, setVariants] = useState({}); // Store variants by product ID
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const tableContainerRef = useRef(null);

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
      const res = await axios.get(`${port}getproductdata`);
      setProductData(res.data);
      // Fetch variants for each product
      const variantPromises = res.data.map((product) =>
        axios.get(`${port}product/${product.id}/variants`)
      );
      const variantResponses = await Promise.all(variantPromises);
      const variantsByProduct = {};
      variantResponses.forEach((response, index) => {
        variantsByProduct[res.data[index].id] = response.data || [];
      });
      setVariants(variantsByProduct);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getBrandData();
    getCategoryData();
    getProductData();
    setSelectedProducts([]);
  }, [activeTab, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredData.map((p) => p.id); // Use filteredData to select only visible products
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
  };

  const handleProductDelete = async () => {
    try {
      if (selectedProducts.length > 0) {
        // Bulk delete
        await Promise.all(
          selectedProducts.map((id) =>
            axios.delete(`${port}deleteproductdata/${id}`)
          )
        );
        notifySuccess("Selected Products Deleted Successfully");
      } else if (deleteId) {
        // Single delete
        await axios.delete(`${port}deleteproductdata/${deleteId}`);
        notifySuccess("Product Deleted Successfully");
      }

      getProductData();
      setSelectedProducts([]);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const filteredData = productData.filter((product) => {
    // Filter by status
    let statusMatch = true;
    if (activeTab === "Published")
      statusMatch = parseInt(product.status, 10) === 1;
    if (activeTab === "Low Stock")
      statusMatch = parseInt(product.status, 10) === 2;
    if (activeTab === "Draft") statusMatch = parseInt(product.status, 10) === 3;
    if (activeTab === "Out Of Stock")
      statusMatch = parseInt(product.status, 10) === 0;

    // Filter by brand
    let brandMatch = true;
    if (selectedBrand !== "All Brands") {
      brandMatch =
        brandData.find((b) => b.id === product.brand_id)?.name ===
        selectedBrand;
    }

    // Filter by category
    let categoryMatch = true;
    if (selectedCategory !== "All Categories") {
      categoryMatch =
        categoryData.find((c) => c.id === product.cate_id)?.name ===
        selectedCategory;
    }

    return statusMatch && brandMatch && categoryMatch;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const product = filteredData.slice(startIndex, endIndex);

  const handleNavigateEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleNavigateView = (id) => {
    navigate(`/admin/view-product/${id}`);
  };

  const isAllSelected =
    product.length > 0 && selectedProducts.length === product.length;

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Product"
          breadcrumbText="Product List"
          button={{ link: "/admin/add-product", text: "Add Product" }}
        />

        <div className="admin-panel-header-tabs-and-deleteall-btn">
          <div className="admin-panel-header-tabs">
            {[
              "All Products",
              "Published",
              "Low Stock",
              "Draft",
              "Out Of Stock",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`admin-panel-header-tab ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="brand-filter-and-category-filter">
            <div
              className="brand-filter admin-panel-header-tabs "
              style={{ marginTop: "10px" }}
            >
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="All Brands">All Brands</option>
                {brandData.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="category-filter admin-panel-header-tabs "
              style={{ marginTop: "10px" }}
            >
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="All Categories">All Categories</option>
                {categoryData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedProducts.length > 0 || deleteId) && (
            <button
              className="admin-header-delete-btn delete-btn"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <MdDelete />
              Delete
            </button>
          )}
        </div>

        <div className="dashboard-table-container" ref={tableContainerRef}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    style={{ width: "16px", height: "16px" }}
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                  />
                </th>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Status</th>
                <th>Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => {
                const productVariants = variants[product.id] || [];
                const variant = productVariants[0] || { price: 0, discount: 0 };
                const displayedPrice =
                  variant.discount > 0
                    ? Math.ceil(variant.price - (variant.price * variant.discount) / 100)
                    : variant.price;

                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        style={{ width: "16px", height: "16px" }}
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </td>
                    <td className="product-info">
                      <img
                        src={`/upload/${getFirstImage(product.image)}`}
                        alt="product_image"
                      />
                      <span className="text_ellipsis">{product.slogan}</span>
                    </td>
                    <td>
                      {brandData.find((b) => b.id === product.brand_id)?.name ??
                        "—"}
                    </td>
                    <td>
                      {categoryData.find((c) => c.id === product.cate_id)?.name ??
                        "—"}
                    </td>
                    <td>
                      <span
                        className={`status ${
                          product.status === 1
                            ? "published"
                            : product.status === 2
                            ? "low-stock"
                            : product.status === 3
                            ? "draft"
                            : "out-of-stock"
                        }`}
                      >
                        {product.status === 1
                          ? "Published"
                          : product.status === 2
                          ? "Low Stock"
                          : product.status === 3
                          ? "Draft"
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      {new Date(product.created_date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="actions">
                      <IoPencil
                        title="Edit"
                        onClick={() => handleNavigateEdit(product.id)}
                      />
                      <IoIosEye
                        title="View"
                        onClick={() => handleNavigateView(product.id)}
                      />
                      <MdDeleteForever
                        title="Delete"
                        onClick={() => {
                          setDeleteId(product.id);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {totalItems > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems}
            />
          )}
        </div>
      </main>

      {isDeleteModalOpen && (
        <DeleteModal
          title="products"
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setDeleteId(null);
          }}
          onDelete={handleProductDelete}
        />
      )}
    </>
  );
};

export default Product;