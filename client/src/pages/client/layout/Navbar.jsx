import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import "../../../assets/css/client/navbar.css";
import { useWishlist } from "../../../context/WishlistContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="container-fluid navbar">
        <div className="container padding-side">
          <NavLink to="/" className="navbar-logo">
            <h4>XCART</h4>
          </NavLink>

          <ul className={isOpen ? "nav-links active" : "nav-links"}>
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={() => setIsOpen(false)}>
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          {!isLoggedIn ? (
            <div className="login-signup-btn">
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                Signup
              </NavLink>
            </div>
          ) : (
            <div className="navbar_shopping_cart_and_profile">
              <NavLink to="/shopping-cart" className="cart-icon-wrapper">
                <AiOutlineShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </NavLink>

              <NavLink to="/wishlist" className="cart-icon-wrapper">
                <AiOutlineHeart />
                {wishlist.length > 0 && (
                  <span className="cart-badge">{wishlist.length}</span>
                )}
              </NavLink>

              <NavLink to="/user-account-details">
                <AiOutlineUser />
              </NavLink>
            </div>
          )}

          <span className="menu-icon">
            {isOpen ? (
              <FaTimes onClick={toggleMenu} />
            ) : (
              <FaBars onClick={toggleMenu} />
            )}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
