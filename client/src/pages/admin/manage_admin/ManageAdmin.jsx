import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosEye } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "../../../Components/DeleteModal";
import { IoPencil } from "react-icons/io5";
import Sidebar from "../layout/Sidebar";
import { notifySuccess } from "../layout/ToastMessage";
import Navbar from "../layout/Navbar";
import Breadcrumb from "../layout/Breadcrumb";
import Pagination from "../../../Components/Pagination";
import { useNavigate } from "react-router-dom";

const port = import.meta.env.VITE_SERVER_URL;

const ManageAdmin = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const tableContainerRef = useRef(null);

  const getAdminData = async () => {
    try {
      const res = await axios.get(`${port}getadmindata`);
      setAdminData(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
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

  const handleAdminDelete = async () => {
    try {
      await axios.delete(`${port}deleteadmindata/${deleteId}`);
      getAdminData();
      notifySuccess("Data Deleted Successfully");
    } catch (error) {
      console.log("Error deleting admin:", error);
    }
    closeDeleteModal();
  };

  useEffect(() => {
    getAdminData();
  }, []);

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
    navigate(`/admin/edit-admin/${id}`);
  };

  const handleNavigateView = (id) => {
    navigate(`/admin/view-admin/${id}`);
  };

  const filteredData = adminData.filter((admin) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return admin.status === 1;
    if (activeTab === "Blocked") return admin.status === 0;
    return true;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Admin"
          breadcrumbText="Admin List"
          button={{ link: "/admin/add-new-admin", text: "Add New Admin" }}
        />

        <div className="admin-panel-header-tabs">
          {["All", "Active", "Blocked"].map((tab) => (
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

        <div className="dashboard-table-container" ref={tableContainerRef}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>DOB</th>
                <th>Status</th>
                <th>Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((admin, index) => (
                <tr key={index}>
                  <td className="product-info admin-profile">
                    <img src={`/upload/${admin.profile}`} alt="profile_image" />
                    <span>
                      {admin.first_name} {admin.last_name}
                    </span>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.mobile_number}</td>
                  <td>{new Date(admin.dob).toLocaleDateString("en-GB")}</td>
                  <td>
                    <span
                      className={`status ${
                        admin.status === 1 ? "published" : "out-of-stock"
                      }`}
                    >
                      {admin.status === 1 ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td>
                    {new Date(admin.created_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="actions">
                    <IoPencil
                      title="Edit"
                      onClick={() => handleNavigateEdit(admin.id)}
                    />
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(admin.id)}
                    />
                    {adminData.length > 1 && (
                      <MdDeleteForever
                        title="Delete"
                        onClick={() => openDeleteModal(admin.id)}
                      />
                    )}
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
          title="Admin"
          onCancel={closeDeleteModal}
          onDelete={handleAdminDelete}
        />
      )}
    </>
  );
};

export default ManageAdmin;
