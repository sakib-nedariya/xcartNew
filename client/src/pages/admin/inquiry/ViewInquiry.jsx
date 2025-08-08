import { Link, NavLink, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const port = import.meta.env.VITE_SERVER_URL;

const ViewInquiry = () => {
  const { id } = useParams();
  const [inquiryData, setInquiryData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    message: "",
  });

  const getInquiryDataWithId = async () => {
    try {
      const res = await axios.get(`${port}getinquirydatawithid/${id}`);
      const fetchedData = res.data[0];
      console.log(fetchedData);
      setInquiryData({
        ...fetchedData,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getInquiryDataWithId();
  }, [id]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div full-height">
        <div
          className="admin-dashboard-main-header"
          style={{ marginBottom: "24px" }}
        >
          <div>
            <h5>View Inquiry</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/inquiry" className="breadcrumb-link active">
                Inquiry List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Inquiry</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/manage-admins"
              className="primary-btn dashboard-add-product-btn"
            >
              <IoArrowBackSharp /> Back
            </NavLink>
          </div>
        </div>
        <div className="dashboard-add-content-card-div">
          <div
            className="dashboard-add-content-left-side"
            style={{ width: "100%" }}
          >
            <div className="dashboard-add-content-card">
              <h6>Inquiry Information</h6>
              <div className="add-product-form-container">
                <div
                  className="coupon-code-input-profile"
                  style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
                >
                  <div>
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      id="first-name"
                      value={inquiryData.first_name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      id="last-name"
                      value={inquiryData.last_name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={inquiryData.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile_number"
                      id="mobile_number"
                      value={inquiryData.mobile_number}
                      readOnly
                    />
                  </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="address">Message</label>
                  <textarea
                    type="text"
                    rows="4"
                    style={{ marginTop: "5px" }}
                    name="message"
                    id="message"
                    value={inquiryData.message}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewInquiry;
