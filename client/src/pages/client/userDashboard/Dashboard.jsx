import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/dashboard.css";
import rocketImage from "../../../assets/image/Rocket.png";
import receiptImage from "../../../assets/image/Receipt.png";
import packageImage from "../../../assets/image/Package.png";
import profile from "../../../assets/image/default_profile.png";
import Footer from "../layout/Footer";
import { useEffect } from "react";
import axios from "axios";

const port = import.meta.env.VITE_SERVER_URL;

const Dashboard = () => {
  const [userDashData, setUserDashData] = useState({});

  const id = localStorage.getItem("id");

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${port}getUserById/${id}`);
      setUserDashData(res.data[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const navigate = useNavigate();

  const handleEditAccount = () => {
    navigate("/user-account-details");
  };

  const handleEditAddress = () => {
    navigate("/user-address");
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div">
            <div className="userdashboard_content_grid">
              <div className="userdashboard_content_card">
                <div className="icon-box">
                  <img src={rocketImage} className="icon" alt="Total Orders" />
                </div>
                <div className="text-box">
                  <div className="dashboard_inner_content_number">154</div>
                  <div className="dashboard_inner_content_label">
                    Total Orders
                  </div>
                </div>
              </div>
              <div className="userdashboard_content_card">
                <div className="icon-box">
                  <img
                    src={receiptImage}
                    className="icon"
                    alt="Pending Orders"
                  />
                </div>
                <div className="text-box">
                  <div className="dashboard_inner_content_number">05</div>
                  <div className="dashboard_inner_content_label">
                    Pending Orders
                  </div>
                </div>
              </div>
              <div className="userdashboard_content_card">
                <div className="icon-box">
                  <img
                    src={packageImage}
                    className="icon"
                    alt="Completed Orders"
                  />
                </div>
                <div className="text-box">
                  <div className="dashboard_inner_content_number">149</div>
                  <div className="dashboard_inner_content_label">
                    Completed Orders
                  </div>
                </div>
              </div>
            </div>

            <div className="userdashboard_user_details">
              <h5 className="dashboard-user-name">
                Hello, {userDashData.first_name} {userDashData.last_name}
              </h5>
              <p>
                From your account dashboard, you can easily check & view your
                <span> Recent Orders</span>, manage your
                <span> Shipping and Billing Addresses</span>, and edit your
                <span> Password</span> and <span>Account Details.</span>
              </p>
            </div>

            <div className="account-info-and-billing-address">
              <div className="account-info-container">
                <h6>Account info</h6>
                <div className="user_details_content">
                  <div className="user-details" style={{ display: "flex" }}>
                    <img
                      src={
                        userDashData.profile
                          ? `/upload/${userDashData.profile}`
                          : profile
                      }
                      alt="profile"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <h5>
                        {userDashData.first_name} {userDashData.last_name}
                      </h5>
                      <p>
                        {userDashData.city}, {userDashData.state}
                      </p>
                    </div>
                  </div>

                  <div className="user_email_and_mobile_no">
                    <p>
                      Email: <span>{userDashData.email}</span>
                    </p>
                    <p>
                      Mobile No: <span>{userDashData.mobile_number}</span>
                    </p>
                  </div>

                  <button
                    className="user-profile-edit-btn"
                    onClick={handleEditAccount}
                  >
                    Edit Account
                  </button>
                </div>
              </div>

              <div className="account-info-container">
                <h6>Billing Address</h6>
                <div className="user_details_content">
                  <div className="user_billing_name">
                    <h5>Sakib Nedariya</h5>
                  </div>
                  <div className="user_email_and_mobile_no">
                    <p className="user-billing-address">
                      Mikro Grafio, 4th Gate, Calicut <br />
                      Pin: 678425
                    </p>
                    <p>
                      Mobile No:<span>+918569741212</span>
                    </p>
                    <p>
                      Email:<span>sakibnedariya@gmail.com</span>
                    </p>
                  </div>
                  <button
                    className="user-profile-edit-btn"
                    onClick={handleEditAddress}
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
