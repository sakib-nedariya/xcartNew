import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import DashboardProImage from "../../../assets/image/dashboard_product_img.png";
import DashboardProfile from "../../../assets/image/dash-profile.png";
import { FaUsers } from "react-icons/fa";
import { CgProductHunt } from "react-icons/cg";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import axios from "axios";
const port = import.meta.env.VITE_SERVER_URL;

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const getCustomerData = async () => {
    try {
      const res = await axios.get(`${port}getcustomerdata`);
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrands(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${port}getcategorydata`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdata`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCustomerData();
    getBrandData();
    getCategoryData();
    getProductData();
  }, []);

  const users = [
    {
      name: "Emma Watson",
      role: "Admin",
      status: "online",
      image: "/images/emma.jpg",
    },
    {
      name: "Antony Hopkins",
      role: "Moderator",
      status: "online",
      image: "/images/antony.jpg",
    },
    {
      name: "Anna Karinina",
      role: "Editor",
      status: "away",
      image: "/images/anna.jpg",
    },
    {
      name: "John Lee",
      role: "Admin",
      status: "offline",
      image: "/images/john.jpg",
    },
    {
      name: "Rowen Atkinson",
      role: "Editor",
      status: "offline",
      image: "/images/rowen.jpg",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "green";
      case "away":
        return "orange";
      case "offline":
        return "gray";
      default:
        return "gray";
    }
  };

  const messages = [
    {
      name: "Emma Watson",
      time: "15 minutes ago",
      message: "Short message goes here...",
      image: "/images/emma.jpg",
    },
    {
      name: "Emma Watson",
      time: "25 minutes ago",
      message: "Short message goes here...",
      image: "/images/emma.jpg",
    },
    {
      name: "Emma Watson",
      time: "30 minutes ago",
      message: "Short message goes here...",
      image: "/images/emma.jpg",
    },
    {
      name: "Emma Watson",
      time: "8 minutes ago",
      message: "Short message goes here...",
      image: "/images/emma.jpg",
    },
    {
      name: "Emma Watson",
      time: "37 minutes ago",
      message: "Short message goes here...",
      image: "/images/emma.jpg",
    },
  ];
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div">
        <h5>Dashboard</h5>
        <div className="stats-container">
          <div className="stats-box">
            <div className="stats-info">
              <div className="stats-title">CUSTOMERS</div>
              <div className="stats-value">{customers.length}</div>
            </div>
            <div className="stats-logo">
              <FaUsers />
            </div>
          </div>

          <div className="stats-box">
            <div className="stats-info">
              <div className="stats-title">BRANDS</div>
              <div className="stats-value">{brands.length}</div>
            </div>
            <div className="stats-logo">
              <IoPricetagsOutline />
            </div>
          </div>

          <div className="stats-box">
            <div className="stats-info">
              <div className="stats-title">CATEGORIES</div>
              <div className="stats-value">{category.length}</div>
            </div>
            <div className="stats-logo">
              <MdOutlineCategory />
            </div>
          </div>

          <div className="stats-box">
            <div className="stats-info">
              <div className="stats-title">PRODUCTS</div>
              <div className="stats-value">{products.length}</div>
            </div>
            <div className="stats-logo">
              <CgProductHunt />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div className="dashboard-table-container">
            <h6 id="dashboard-title-container-header">Latest Orders</h6>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-stock-keeping-unit">302012</td>
                  <td className="product-info">
                    <img src={DashboardProImage} alt="iPhone 11 Pro" />
                    <span>iPhone 11 Pro</span>
                  </td>
                  <td>Josh Wisley</td>
                  <td>20 Feb 2024</td>

                  <td>
                    <span className="status processing">Processing</span>
                  </td>
                </tr>
                <tr>
                  <td className="product-stock-keeping-unit">302012</td>
                  <td className="product-info">
                    <img src={DashboardProImage} alt="iPhone 11 Pro" />
                    <span>iPhone 11 Pro</span>
                  </td>
                  <td>Josh Wisley</td>
                  <td>20 Feb 2024</td>
                  <td>
                    <span className="status processing">Processing</span>
                  </td>
                </tr>
                <tr>
                  <td className="product-stock-keeping-unit">302012</td>
                  <td className="product-info">
                    <img src={DashboardProImage} alt="iPhone 11 Pro" />
                    <span>iPhone 11 Pro</span>
                  </td>
                  <td>Josh Wisley</td>
                  <td>20 Feb 2024</td>
                  <td>
                    <span className="status processing">Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="dashboard-table-container active-user-container">
            <div className="dashboard-title-container-header">
              <h6 id="dashboard-title-container-header">Active Users</h6>
            </div>

            <div className="user-list">
              {users.map((user, index) => (
                <div className="user-item" key={index}>
                  <img
                    src={DashboardProfile}
                    alt="profile-logo"
                    className="user-img"
                  />
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-role">{user.role}</p>
                  </div>
                  <span
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
