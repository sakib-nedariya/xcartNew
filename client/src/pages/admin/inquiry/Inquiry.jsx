import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Breadcrumb from "../layout/Breadcrumb";
import { IoIosEye } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const port = import.meta.env.VITE_SERVER_URL;

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInquiries = async () => {
      try {
        const res = await axios.get(`${port}getinquirydata`);
        setInquiries(res.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    getInquiries();
  }, []);

  const handleNavigateView = (id) => {
    navigate(`/admin/view-inquiry/${id}`);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div full-height">
        <Breadcrumb title="Inquiry" breadcrumbText="Inquiry List" />
        <div className="dashboard-table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    style={{ width: "16px", height: "16px" }}
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
                    />
                  </td>
                  <td style={{ color: "black" }}>
                    {inq.first_name}&nbsp;{inq.last_name}
                  </td>
                  <td style={{ textTransform: "lowercase" }}>{inq.email}</td>
                  <td>{inq.mobile_number}</td>
                  <td className="inquiry-message">{inq.message}</td>
                  <td className="actions">
                    <IoIosEye
                      title="View"
                      onClick={() => handleNavigateView(inq.id)}
                    />
                    <MdDeleteForever title="Delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Inquiry;
