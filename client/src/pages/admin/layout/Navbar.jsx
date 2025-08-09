import React, { useState, useEffect } from "react";
import { LuBellRing } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { TiArrowSortedDown } from "react-icons/ti";
import DashboardProfile from "../../../assets/image/dash-profile.png";
import "../../../assets/css/admin/navbar.css";

const port = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {
  const [newMessages, setNewMessages] = useState(0);
  

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch(`${port}getinquirydata`);
        const data = await res.json();

        // You can filter for unread if you have a flag like inq.is_read === false
        setNewMessages(data.length); 
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchInquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar-seach-input">
        <input type="text" placeholder="Search..." />
        <GoSearch />
      </div>
      <div className="dashboard-nav-notification-bell-profile">
        <div className="dashboard-nav-notification-bell">
          <LuBellRing />
          {newMessages > 0 && (
            <span className="notification-badge">{newMessages}</span>
          )}
        </div>
        <div className="dashboard-nav-profile">
          <img src={DashboardProfile} alt="profile-logo" />
          <div className="dashboard-nav-profile-name">
            <span>Sakib Nedariya</span>
            <p>Admin</p>
          </div>
          <TiArrowSortedDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
