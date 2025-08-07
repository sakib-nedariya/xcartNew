import React, { useState, useEffect, useRef } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import DeleteModal from "../../../Components/DeleteModal";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { notifySuccess } from "../layout/ToastMessage";
import { IoPencil } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import Breadcrumb from "../layout/Breadcrumb";
import Pagination from "../../../Components/Pagination";
import { useNavigate } from "react-router-dom";

const port = import.meta.env.VITE_SERVER_URL;

const Coupon = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [couponData, setCouponData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Delete coupon
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const tableContainerRef = useRef(null);

  const getCouponData = async () => {
    try {
      const res = await axios.get(`${port}getcoupondata`);
      setCouponData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleCouponDelete = async () => {
    try {
      if (selectedCoupon.length > 0) {
        // Multiple delete
        await Promise.all(
          selectedCoupon.map((id) =>
            axios.delete(`${port}deletecoupondata/${id}`)
          )
        );
        notifySuccess("Selected Coupons Deleted Successfully");
      } else if (deleteId) {
        // Single delete
        await axios.delete(`${port}deletecoupondata/${deleteId}`);
        notifySuccess("Coupon Deleted Successfully");
      }

      getCouponData();
      setSelectedCoupon([]);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting coupon(s):", error);
    }
  };

  useEffect(() => {
    getCouponData();
    setSelectedCoupon([]);
  }, [activeTab, currentPage]);

  // Filter data based on activeTab
  const filteredData = couponData.filter((coupon) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return coupon.status === 1;
    if (activeTab === "Expired") return coupon.status === 0;
    return true;
  });

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = coupon.map((p) => p.id);
      setSelectedCoupon(allIds);
    } else {
      setSelectedCoupon([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCoupon((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const coupon = filteredData.slice(startIndex, endIndex);

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

  const handleNavigateEdit = (id) => {
    navigate(`/admin/edit-coupon/${id}`);
  };

  const handleNavigateView = (id) => {
    navigate(`/admin/view-coupon/${id}`);
  };

  const isAllSelected =
    coupon.length > 0 && selectedCoupon.length === coupon.length;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Coupon"
          breadcrumbText="Coupon List"
          button={{ link: "/admin/create-coupon", text: "Create Coupon" }}
        />
        <div className="admin-panel-header-tabs-and-deleteall-btn">
          <div className="admin-panel-header-tabs">
            <button
              type="button"
              className={`admin-panel-header-tab ${
                activeTab === "All" ? "active" : ""
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            <button
              type="button"
              className={`admin-panel-header-tab ${
                activeTab === "Active" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Active")}
            >
              Active
            </button>
            <button
              type="button"
              className={`admin-panel-header-tab ${
                activeTab === "Expired" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Expired")}
            >
              Expired
            </button>
          </div>

          {selectedCoupon.length > 0 && (
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
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Max</th>
                <th>Min</th>
                <th>Start</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupon.map((coupon, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={selectedCoupon.includes(coupon.id)}
                      onChange={() => handleCheckboxChange(coupon.id)}
                    />
                  </td>
                  <td className="product-coupon-code">{coupon.coupon_code}</td>
                  <td className="product-stock-keeping-unit discount">
                    {coupon.discount}%
                  </td>
                  <td>₹{coupon.max_price}</td>
                  <td>₹{coupon.min_price}</td>
                  <td>
                    {new Date(coupon.start_date).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {new Date(coupon.expiry_date).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <span
                      className={`status ${
                        coupon.status === 1 ? "published" : "out-of-stock"
                      }`}
                    >
                      {coupon.status === 1 ? "Active" : "Expired"}
                    </span>
                  </td>
                  <td>
                    {new Date(coupon.created_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="actions">
                    <IoPencil
                      title="Edit"
                      onClick={() => handleNavigateEdit(coupon.id)}
                    />
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(coupon.id)}
                    />
                    <MdDeleteForever
                      title="Delete"
                      onClick={() => openDeleteModal(coupon.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          {filteredData.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredData.length}
            />
          )}
        </div>
      </main>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          title="Coupon"
          onCancel={closeDeleteModal}
          onDelete={handleCouponDelete}
        />
      )}
    </>
  );
};

export default Coupon;
