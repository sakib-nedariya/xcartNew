import React, { useState, useEffect, useRef } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import DeleteModal from "../../../Components/DeleteModal";
import { IoPencil } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import Breadcrumb from "../layout/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../layout/ToastMessage";
import Pagination from "../../../Components/Pagination";
import axios from "axios";
const port = import.meta.env.VITE_SERVER_URL;

const Brand = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [brandData, setBrandData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // NEW
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const tableContainerRef = useRef(null);

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openDeleteModal = (id = null) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleBrandDelete = async () => {
    try {
      if (selectedBrands.length > 0) {
        await Promise.all(
          selectedBrands.map((id) =>
            axios.delete(`${port}deletebranddata/${id}`)
          )
        );
        notifySuccess("Selected brands deleted successfully");
      } else if (deleteId) {
        await axios.delete(`${port}deletebranddata/${deleteId}`);
        notifySuccess("Brand deleted successfully");
      }

      getBrandData();
      setSelectedBrands([]);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting brand(s):", error);
    }
  };

  useEffect(() => {
    getBrandData();
    setSelectedBrands([]);
  }, [activeTab, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = brands.map((p) => p.id);
      setSelectedBrands(allIds);
    } else {
      setSelectedBrands([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
  };

  const handleNavigateEdit = (id) => {
    navigate(`/admin/edit-brand/${id}`);
  };

  const handleNavigateView = (id) => {
    navigate(`/admin/view-brand/${id}`);
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

  const filteredData = brandData.filter((brand) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return parseInt(brand.status, 10) === 1;
    if (activeTab === "Disable") return parseInt(brand.status, 10) === 0;
    return true;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const brands = filteredData.slice(startIndex, endIndex);

  const isAllSelected =
    brands.length > 0 && selectedBrands.length === brands.length;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Brands"
          breadcrumbText="Brand List"
          button={{ link: "/admin/add-brand", text: "Add Brand" }}
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

          {(selectedBrands.length > 0 || deleteId) && (
            <button
              className="admin-header-delete-btn delete-btn"
              onClick={() => openDeleteModal()}
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
                <th style={{ width: "20%" }}>Brand Name</th>
                <th style={{ width: "40%" }}>Description</th>
                <th style={{ width: "15%" }}>Created Date</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "15%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleCheckboxChange(brand.id)}
                    />
                  </td>
                  <td className="product-info admin-profile">
                    <img src={`/upload/${brand.image}`} alt="brand_image" />
                    <span>{brand.name}</span>
                  </td>
                  <td>{brand.description.slice(0, 40)}</td>
                  <td>
                    {new Date(brand.created_date).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <span
                      className={`status ${
                        brand.status === 1 ? "published" : "out-of-stock"
                      }`}
                    >
                      {brand.status === 1 ? "Active" : "Disable"}
                    </span>
                  </td>
                  <td className="actions">
                    <IoPencil
                      title="Edit"
                      onClick={() => handleNavigateEdit(brand.id)}
                    />
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(brand.id)}
                    />
                    <MdDeleteForever
                      title="Delete"
                      onClick={() => openDeleteModal(brand.id)}
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
          title="Brand"
          onCancel={closeDeleteModal}
          onDelete={handleBrandDelete}
        />
      )}
    </>
  );
};

export default Brand;
