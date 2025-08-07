import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import default_profile from "../../../assets/image/default_profile.png"; 

const port = import.meta.env.VITE_SERVER_URL;

const ViewUsers = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile_number: "",
    profile: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${port}getUserById/${id}`);
        setUserData(res.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <div className="admin-dashboard-main-header" style={{ marginBottom: "24px" }}>
          <div>
            <h5>View User</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link to="/admin/users" className="breadcrumb-link active">
                User List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View User</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink to="/admin/users" className="primary-btn dashboard-add-product-btn">
              <IoArrowBackSharp /> Back
            </NavLink>
          </div>
        </div>

        <div className="dashboard-add-content-card-div">
          <div className="dashboard-add-content-left-side">
            <div className="dashboard-add-content-card">
              <h6>General Information</h6>
              <div className="add-product-form-container">
                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" value={userData.first_name} readOnly />
                  </div>

                  <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" value={userData.last_name} readOnly />
                  </div>

                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={userData.username} readOnly />
                  </div>
                </div>

                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={userData.email} readOnly />
                  </div>
                  <div>
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input type="text" id="mobile-number" value={userData.mobile_number} readOnly />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={userData.country} readOnly />
                  </div>
                </div>

                <div className="coupon-code-input-profile">
                  <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={userData.state} readOnly />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={userData.city} readOnly />
                  </div>
                  <div>
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" id="pincode" value={userData.pincode} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-add-content-right-side">
            <div className="dashboard-add-content-card">
              <h6>Profile</h6>
              <div className="add-product-form-container">
                <label htmlFor="photo">Photo</label>
                <div className="add-product-upload-container">
                  <div className="add-product-upload-icon">
                    <img
                      src={userData.profile ? `/upload/${userData.profile}` : default_profile}
                      alt="Profile"
                      className="user-profile-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-add-content-card">
              <h6>Status</h6>
              <div className="add-product-form-container">
                <label htmlFor="status">User Status</label>
                <select id="status" value={userData.status} readOnly>
                  <option value="1">Active</option>
                  <option value="0">Blocked</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewUsers;
