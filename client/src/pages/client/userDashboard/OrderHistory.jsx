import React from "react";
import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/orderHistory.css";
import { GoArrowRight } from "react-icons/go";
import Footer from "../layout/Footer";

const OrderHistory = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div userdashboard_main_border">
            <h6>Order History</h6>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">In Progress</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Delivered</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">In Progress</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Delivered</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Canceled</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>

                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">In Progress</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Delivered</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">In Progress</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Delivered</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
                <tr>
                  <td className="userdashboard_inner_content_div">
                    <span className="order-history-product-name">
                      iphone 13 pro
                    </span>
                  </td>
                  <td className="product-in-stock">Canceled</td>
                  <td className="order-history-date">Dec 30,2025 07:00 PM</td>
                  <td className="order-history-price">₹15,999 (5 Items)</td>
                  <td
                    className="order-history-view"
                    style={{ cursor: "pointer" }}
                  >
                    <a className="order-history-view-btn">View Details</a>
                    <GoArrowRight />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
