import React, { useState, useEffect, useRef } from "react";
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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

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
      const allIds = product.map((p) => p.id);
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
        notifySuccess("Produc Deleted Successfully");
      }

      getProductData();
      setSelectedProducts([]);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product(s):", error);
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
    if (activeTab === "All Products") return true;
    if (activeTab === "Published") return parseInt(product.status, 10) === 1;
    if (activeTab === "Low Stock") return parseInt(product.status, 10) === 2;
    if (activeTab === "Draft") return parseInt(product.status, 10) === 3;
    if (activeTab === "Out Of Stock") return parseInt(product.status, 10) === 0;
    return false;
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
                <th>Discount</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
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
                    <span>{product.slogan}</span>
                  </td>
                  <td>
                    {brandData.find((b) => b.id === product.brand_id)?.name ??
                      "—"}
                  </td>
                  <td>
                    {categoryData.find((c) => c.id === product.cate_id)?.name ??
                      "—"}
                  </td>
                  <td>{product.discount}%</td>
                  <td>₹{product.price}</td>
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
                        setDeleteId(product.id); // ✅ Single delete
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
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
            setDeleteId(null); // ✅ Clear deleteId on cancel
          }}
          onDelete={handleProductDelete}
        />
      )}
    </>
  );
};

export default Product;
