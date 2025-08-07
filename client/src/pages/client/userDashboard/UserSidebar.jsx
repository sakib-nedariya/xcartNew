import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUser, FiLogOut } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
import LogoutModal from "../../../Components/LogoutModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../assets/css/client/userDashboard/userSidebar.css";

const UserSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout(); // logout from AuthContext
    setShowModal(false); // Close modal
    toast.success("Successfully logged out"); // Show success notification
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="user_sidebar_main">
      <ul>
        <li>
          <NavLink to="/user-dashboard">
            <MdOutlineDashboard />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-account-details">
            <FiUser />
            Account Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/order-history">
            <AiOutlineClockCircle />
            Order History
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-cart">
            <AiOutlineShoppingCart />
            Shopping Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist">
            <AiOutlineHeart />
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-address">
            <IoLocationOutline />
            Address
          </NavLink>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setShowModal(true)}
            className="logout-link"
          >
            <FiLogOut />
            Logout
          </a>
        </li>
      </ul>

      {showModal && (
        <LogoutModal
          onCancel={() => setShowModal(false)}
          onLogout={handleLogoutConfirm}
        />
      )}
    </div>
  );
};

export default UserSidebar;
