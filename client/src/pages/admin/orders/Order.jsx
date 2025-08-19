import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { IoMdArrowDropright, IoIosEye } from "react-icons/io";
import DashboardProImage from "../../../assets/image/dashboard_product_img.png";
import { MdDeleteForever } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Breadcrumb from "../layout/Breadcrumb";

const Order = () => {
  const [activeTab, setActiveTab] = useState("All Status");

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="admin-panel-header-div">
        <Breadcrumb
          title="Order"
          breadcrumbText="Order List"
          // button={{ link: "/admin/orders", text: "Add Order" }}
        />

        <div className="admin-panel-header-tabs">
          <button
            type="button"
            className={`admin-panel-header-tab 
                ${activeTab === "All Status" ? "active" : ""}`}
            onClick={() => setActiveTab("All Status")}
          >
            All Status
          </button>
          <button
            type="button"
            className={`admin-panel-header-tab 
                ${activeTab === "Processing" ? "active" : ""}`}
            onClick={() => setActiveTab("Processing")}
          >
            Processing
          </button>
          <button
            type="button"
            className={`admin-panel-header-tab 
                ${activeTab === "Shipped" ? "active" : ""}`}
            onClick={() => setActiveTab("Shipped")}
          >
            Shipped
          </button>
          <button
            type="button"
            className={`admin-panel-header-tab 
                ${activeTab === "Delivered" ? "active" : ""}`}
            onClick={() => setActiveTab("Delivered")}
          >
            Delivered
          </button>
          <button
            type="button"
            className={`admin-panel-header-tab 
                ${activeTab === "Cancelled" ? "active" : ""}`}
            onClick={() => setActiveTab("Cancelled")}
          >
            Cancelled
          </button>
        </div>

        <div className="dashboard-table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status published">Delivered</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status draft">Shipped</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status out-of-stock">Cancelled</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status low-stock">In Progress</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status published">Delivered</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status draft">Shipped</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status out-of-stock">Cancelled</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status low-stock">In Progress</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status published">Delivered</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status draft">Shipped</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status out-of-stock">Cancelled</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status low-stock">In Progress</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
              <tr>
                <td className="product-stock-keeping-unit">302012</td>
                <td className="product-info">
                  <img src={DashboardProImage} alt="iPhone 11 Pro" />
                  <span>iPhone 11 Pro</span>
                </td>
                <td>20 Feb 2024</td>
                <td>Josh Wisley</td>
                <td>₹59000</td>
                <td>24 Feb 2024</td>
                <td>
                  <span className="status low-stock">In Progress</span>
                </td>
                <td className="actions">
                  <IoPencil />
                  <IoIosEye />
                  <MdDeleteForever />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="table-footer-pagination">
            <span>Showing 1-10 from 100</span>
            <ul className="pagination">
              <li className="arrow">
                <HiOutlineArrowLeft />
              </li>
              <li className="">01</li>
              <li>02</li>
              <li>03</li>
              <li>04</li>
              <li>05</li>
              <li className="arrow">
                <HiOutlineArrowRight />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order;
