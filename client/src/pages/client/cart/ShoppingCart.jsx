import React, { useEffect } from "react";
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
  const { cartItems, cartTotals, updateQuantity, removeFromCart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleIncrement = (product) => {
    if (product?.id && product?.variant_id && product?.quantity) {
      updateQuantity(product.id, product.variant_id, product.quantity + 1);
    }
  };

  const handleDecrement = (product) => {
    if (product?.quantity <= 1) return;
    if (product?.id && product?.variant_id) {
      updateQuantity(product.id, product.variant_id, product.quantity - 1);
    }
  };

  const handleRemove = (product) => {
    if (product?.id && product?.variant_id) {
      removeFromCart(product.id, product.variant_id);
    }
  };

  const getFirstImage = (image) => {
    if (!image) return "/path-to-default-image/default.png";
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const handleCheckoutPageNavigate = () => {
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
                  <th>Variant</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {!Array.isArray(cartItems) || cartItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} align="center">
                      <img src={noItemFound} alt="No items in cart" />
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={`${item.id}-${item.variant_id}`}>
                      <td className="shopping-cart-container-product">
                        <span
                          className="product-remove-btn"
                          title="Remove"
                          onClick={() => handleRemove(item)}
                        >
                          <MdOutlineCancel />
                        </span>
                        <img
                          src={`/upload/${getFirstImage(item.image)}`}
                          alt={item.slogan || "Product"}
                        />
                        <span className="shopping-cart-product-name">
                          {item.slogan || "Unknown Product"}
                        </span>
                      </td>
                      <td>
                        <span className="product-variant" style={{fontSize:"13px"}}>
                          {item.memory || "N/A"}/{item.storage || "N/A"} GB
                        </span>
                      </td>
                      <td>
                        <span className="product-new-price">
                          ₹{item.final_price || item.price || 0}
                        </span>
                      </td>
                      <td>
                        <div className="product_quantity">
                          <HiMinusSm onClick={() => handleDecrement(item)} />
                          <span>{item.quantity || 0}</span>
                          <HiPlusSm onClick={() => handleIncrement(item)} />
                        </div>
                      </td>
                      <td className="product-total-price">
                        ₹{item.total_price || 0}
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
                <span className="shopping-cart-price">₹{cartTotals.subtotal || 0}</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Shipping</span>
                <span className="shopping-cart-price">Free</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Discount</span>
                <span className="shopping-cart-price">₹{cartTotals.discount || 999}</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Tax</span>
                <span className="shopping-cart-price">₹{cartTotals.tax || 2999}</span>
              </div>
              <div className="shopping-cart-price-row product-total-price">
                <span>Total</span>
                <span>
                  <b>₹{cartTotals.total || 0}</b>
                </span>
              </div>
              <button
                type="button"
                className="shopping-cartcheckout-btn primary-btn"
                onClick={handleCheckoutPageNavigate}
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