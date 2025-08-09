import { useEffect, useRef, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Breadcrumb from "../layout/Breadcrumb";
import { IoIosEye } from "react-icons/io";
import default_profile from "../../../assets/image/default_profile.png"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const port = import.meta.env.VITE_SERVER_URL;

const Users = () => {
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

   const tableContainerRef = useRef(null);

  // Filter data based on active tab
  const filteredData = user.filter((user) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return user.status === 1;
    if (activeTab === "Blocked") return user.status === 0;
    return true;
  });
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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

  const handleNavigateView = (id) => {
    navigate(`/admin/view-user/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${port}getAllUsers`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <Breadcrumb title="Users" breadcrumbText="User List" />

         <div className="admin-panel-header-tabs">
          {["All", "Active", "Blocked"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`admin-panel-header-tab ${activeTab === tab ? "active" : ""}`}
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
                <th>Mobile Number</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, index) => (
                <tr key={index}>
                  <td className="product-info admin-profile">
                    <img
                      src={
                        user.profile
                          ? `/upload/${user.profile}`
                          : default_profile
                      }
                      alt="profile_image"
                      className="user-profile-image"
                    />
                    <span>
                      {user.first_name}&nbsp;{user.last_name}
                    </span>
                  </td>

                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                  <td>
                    <span
                      className={`status ${
                        user.status === 1 ? "published" : "out-of-stock"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="actions">
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(user.id)}
                    /> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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
    </>
  );
};

export default Users;
