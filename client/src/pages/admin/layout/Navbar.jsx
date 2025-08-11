import React, { useState, useEffect } from "react";
import { LuBellRing } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { TiArrowSortedDown } from "react-icons/ti";
import DashboardProfile from "../../../assets/image/default_profile.png";
import "../../../assets/css/admin/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const port = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(`${port}getunreadinquirycount`);
        const data = await res.json();
        setNewMessages(data.count);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar-seach-input">
        <input type="text" placeholder="Search..." />
        <GoSearch />
      </div>
      <div className="dashboard-nav-notification-bell-profile">
        <div className="dashboard-nav-notification-bell" onClick={() => navigate("/admin/inquiry")}>
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
