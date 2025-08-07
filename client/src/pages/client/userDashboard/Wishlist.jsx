import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/wishlist.css";
import { MdOutlineCancel } from "react-icons/md";
import Footer from "../layout/Footer";
import { useWishlist } from "../../../context/WishlistContext";
import noItemFound from "../../../assets/image/wishlist.jpg";

const WishList = () => {
  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };
  const { wishlist, removeFromWishlist } = useWishlist();
  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div userdashboard_main_border">
            <h6>Wishlist</h6>
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th></th> 
                </tr>
              </thead>
              <tbody>
                {wishlist.length === 0 ? (
                  <td colSpan={5} align="center">
                    <img src={noItemFound} />
                  </td>
                ) : (
                  wishlist.map((product, index) => (
                    <tr key={index}>
                      <td className="userdashboard_inner_content_div">
                        <img
                          src={`/upload/${getFirstImage(product.image)}`}
                          alt="product_image"
                        />
                        <span className="shopping-cart-product-name">
                          {product.slogan}
                        </span>
                      </td>
                      <td>
                        <span className="product-old-price">₹89000</span>
                        <span className="product-new-price">
                          ₹{product.price}
                        </span>
                      </td>
                      <td className="product-in-stock">In Stock</td>
                      <td>
                        <button className="primary-btn wishlist_add_to_cart_btn ">
                          Add to Cart
                        </button>
                      </td>
                      <td>
                        <span
                          className="product-remove-btn"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <MdOutlineCancel />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
