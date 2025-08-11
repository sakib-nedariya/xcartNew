import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Breadcrumb from "../layout/Breadcrumb";
import { IoIosEye } from "react-icons/io";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DeleteModal from "../../../Components/DeleteModal";
import { notifySuccess } from "../layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiries, setSelectedInquiries] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const tableContainerRef = useRef(null);

  const getInquiries = async () => {
    try {
      const res = await axios.get(`${port}getinquirydata`);
      setInquiries(res.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await axios.post(`${port}markinquiriesread`);
      } catch (error) {
        console.error("Error marking inquiries as read:", error);
      }
    };

    getInquiries();
    markAsRead(); // Page open hote hi unread reset
    setSelectedInquiries([]);
  }, []);

  const openDeleteModal = (id = null) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleInquiryDelete = async () => {
    try {
      if (selectedInquiries.length > 0) {
        await Promise.all(
          selectedInquiries.map((id) =>
            axios.delete(`${port}deleteinquirydata/${id}`)
          )
        );
        notifySuccess("Selected inquiries deleted successfully");
      } else if (deleteId) {
        await axios.delete(`${port}deleteinquirydata/${deleteId}`);
        notifySuccess("Inquiry deleted successfully");
      }

      getInquiries();
      setSelectedInquiries([]);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting inquiries:", error);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = inquiries.map((inq) => inq.id);
      setSelectedInquiries(allIds);
    } else {
      setSelectedInquiries([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedInquiries((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : [...prevSelected, id]
    );
  };

  const handleNavigateView = (id) => {
    navigate(`/admin/view-inquiry/${id}`);
  };

  const isAllSelected =
    inquiries.length > 0 && selectedInquiries.length === inquiries.length;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div full-height">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumb title="Inquiry" breadcrumbText="Inquiry List" />
          {(selectedInquiries.length > 0 || deleteId) && (
            <div className="admin-panel-header-tabs-and-deleteall-btn">
              <button
                className="admin-header-delete-btn delete-btn"
                onClick={() => openDeleteModal()}
              >
                <MdDelete />
                Delete
              </button>
            </div>
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
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={selectedInquiries.includes(inq.id)}
                      onChange={() => handleCheckboxChange(inq.id)}
                    />
                  </td>
                  <td style={{ color: "black" }}>
                    {inq.first_name} {inq.last_name}
                  </td>
                  <td style={{ textTransform: "lowercase" }}>{inq.email}</td>
                  <td>{inq.mobile_number}</td>
                  <td className="inquiry-message">{inq.message}</td>
                  <td className="actions">
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(inq.id)}
                    />
                    <MdDeleteForever
                      title="Delete"
                      onClick={() => openDeleteModal(inq.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isDeleteModalOpen && (
        <DeleteModal
          title="Inquiry"
          onCancel={closeDeleteModal}
          onDelete={handleInquiryDelete}
        />
      )}
    </>
  );
};

export default Inquiry;
