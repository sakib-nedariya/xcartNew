import React, { useState, useEffect, useRef } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import DeleteModal from "../../../Components/DeleteModal";
import { IoPencil } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../layout/ToastMessage";
import Pagination from "../../../Components/Pagination";
import Breadcrumb from "../layout/Breadcrumb";

const port = import.meta.env.VITE_SERVER_URL;

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const tableContainerRef = useRef(null);

  // Fetch data
  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${port}getcategorydata`);
      setCategoryData(res.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
    getBrandData();
    setSelectedCategory([]);
  }, [activeTab, currentPage]);

  // Modal logic
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  // Deletion logic
  const handleCategoryDelete = async () => {
    try {
      if (selectedCategory.length > 0) {
        await Promise.all(
          selectedCategory.map((id) =>
            axios.delete(`${port}deletecategorydata/${id}`)
          )
        );
        notifySuccess("Selected categories deleted successfully");
      } else if (deleteId) {
        await axios.delete(`${port}deletecategorydata/${deleteId}`);
        notifySuccess("Category deleted successfully");
      }

      getCategoryData();
      setSelectedCategory([]);
      setDeleteId(null);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Filtering
  const filteredData = categoryData.filter((category) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return parseInt(category.status, 10) === 1;
    if (activeTab === "Disable") return parseInt(category.status, 10) === 0;
    return true;
  });

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredData.slice(startIndex, endIndex);

  const isAllSelected =
    paginatedCategories.length > 0 &&
    selectedCategory.length === paginatedCategories.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedCategories.map((cat) => cat.id);
      setSelectedCategory(allIds);
    } else {
      setSelectedCategory([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategory((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
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

  const handleNavigateEdit = (id) => navigate(`/admin/edit-category/${id}`);
  const handleNavigateView = (id) => navigate(`/admin/view-category/${id}`);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Category List"
          breadcrumbText="Category List"
          button={{ link: "/admin/add-category", text: "Add Category" }}
        />
        <div className="admin-panel-header-tabs-and-deleteall-btn">
          <div className="admin-panel-header-tabs">
            {["All", "Active", "Disable"].map((tab) => (
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

          {selectedCategory.length > 0 && (
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
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={selectedCategory.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                    />
                  </td>
                  <td className="product-info">
                    <img
                      src={`/upload/${category.image}`}
                      alt="category_image"
                    />
                    <span>{category.name}</span>
                  </td>
                  <td>{category.description.slice(0, 40)}</td>
                  <td>
                    {
                      brandData.find((brand) => brand.id === category.brand_id)
                        ?.name
                    }
                  </td>
                  <td>
                    {new Date(category.created_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td>
                    <span
                      className={`status ${
                        category.status === 1 ? "published" : "out-of-stock"
                      }`}
                    >
                      {category.status === 1 ? "Active" : "Disable"}
                    </span>
                  </td>
                  <td className="actions">
                    <IoPencil
                      title="Edit"
                      onClick={() => handleNavigateEdit(category.id)}
                    />
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(category.id)}
                    />
                    <MdDeleteForever
                      title="Delete"
                      onClick={() => openDeleteModal(category.id)}
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
          title="Category"
          onCancel={closeDeleteModal}
          onDelete={handleCategoryDelete}
        />
      )}
    </>
  );
};

export default Category;
