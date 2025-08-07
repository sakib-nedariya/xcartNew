import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import "../../../assets/css/client/shoppingcart.css";
import Navbar from "../layout/Navbar";
import noItemFound from "../../../assets/image/no-item-add.png";
import Footer from "../layout/Footer";
import { useCart } from "../../../context/CartContext";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleIncrement = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 1) + 1,
    }));
    addToCart(product);
  };

  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const handleDecrement = (product) => {
    setQuantities((prev) => {
      const currentQty = prev[product.id] || 1;
      if (currentQty <= 1) return prev;
      return { ...prev, [product.id]: currentQty - 1 };
    });
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const qty = quantities[item.id] || 1;
      return total + qty * item.price;
    }, 0);
  };

  const handlecheckoutpagenavigate = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <section className="container-fluid shopping-cart-section">
        <div className="container padding-main shopping-cart">
          <div className="shopping-cart-container">
            <h6>Shopping Cart</h6>
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} align="center">
                      <img src={noItemFound} />
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="shopping-cart-container-product">
                        <span
                          className="product-remove-btn"
                          title="Remove"
                          onClick={() => handleRemove(item.id)}
                        >
                          <MdOutlineCancel />
                        </span>
                        <img
                      src={`/upload/${getFirstImage(item.image)}`}
                      alt={item.slogan}
                    />
                        <span className="shopping-cart-product-name">
                          {item.slogan}
                        </span>
                      </td>
                      <td>
                        <span className="product-new-price">₹{item.price}</span>
                      </td>
                      <td>
                        <div className="product_quantity">
                          <HiMinusSm onClick={() => handleDecrement(item)} />
                          <span>{quantities[item.id] || 1}</span>
                          <HiPlusSm onClick={() => handleIncrement(item)} />
                        </div>
                      </td>
                      <td className="product-last-price">
                        ₹{(quantities[item.id] || 1) * item.price}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="shopping-cart-total-price-details">
            <div className="shopping-cart-price-card">
              <h6>Cart Totals</h6>
              <div className="shopping-cart-price-row">
                <span>Sub-total</span>
                <span className="shopping-cart-price">₹{getSubtotal()}</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Shipping</span>
                <span className="shopping-cart-price">Free</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Discount</span>
                <span className="shopping-cart-price">₹999</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Tax</span>
                <span className="shopping-cart-price">₹2999</span>
              </div>
              <div className="shopping-cart-price-row product-total-price">
                <span>Total</span>
                <span>
                  <b>₹{getSubtotal() + 2999 - 999}</b>
                </span>
              </div>
              <button
                type="button"
                className="shopping-cartcheckout-btn primary-btn"
                onClick={handlecheckoutpagenavigate}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="shopping-cart-price-card coupon-code">
              <h6>Coupon Code</h6>
              <input
                type="text"
                className="coupon-input"
                placeholder="Coupon Code"
              />
              <button type="button" className="apply-coupon-btn secondary-btn">
                APPLY COUPON
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShoppingCart;
