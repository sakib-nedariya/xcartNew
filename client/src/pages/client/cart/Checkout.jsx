import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/client/checkout.css";
import CODImage from "../../../assets/image/CashOnDelivery.png";
import Razorpay from "../../../assets/image/razorpay.png";
import upiLogo from "../../../assets/image/UPI-Logo.webp";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useCart } from "../../../context/CartContext";
import axios from "axios";

const port = import.meta.env.VITE_SERVER_URL;

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    companyname: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    phonenumber: "",
  });

  const { state } = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = storedUser?.id || localStorage.getItem("id");

  const handleSelection = (option) => setSelectedOption(option);
  const { cartItems, cartTotals, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (!couponCode) {
      alert("Please enter coupon code");
      return;
    }
    applyCoupon(couponCode);
  };

  // Fetch saved address on load
  useEffect(() => {
    if (loggedInUserId) {
      axios
        .get(`${port}getShippingAddress/${loggedInUserId}`)
        .then((res) => {
          setFormValues({
            firstname: res.data.first_name || "",
            lastname: res.data.last_name || "",
            companyname: res.data.company_name || "",
            address: res.data.address || "",
            country: res.data.country || "",
            state: res.data.state || "",
            city: res.data.city || "",
            pincode: res.data.pincode || "",
            email: res.data.email || "",
            phonenumber: res.data.mobile_number || "",
          });
        })
        .catch((err) => {
          console.log("No saved address or error:", err);
        });
    }
  }, [loggedInUserId]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
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

  // Determine items to display: Buy Now product or cart items
  const displayItems = state?.buyNowProduct ? [state.buyNowProduct] : cartItems;

  // Calculate totals for Buy Now product or cart
  const subtotal = state?.buyNowProduct
    ? state.buyNowProduct.totalPrice
    : cartTotals.subtotal;
  const couponDiscount = cartTotals.discount || 0;
  const total = subtotal - couponDiscount;

  return (
    <>
      <Navbar />
      <section className="container-fluid checkout-section">
        <div className="container padding-main checkout-main-div">
          <div className="checkout-container">
            <h6>Shipping Information</h6>
            <form className="checkout-section-form-container">
              <div className="checkout-form-container-group">
                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    First Name <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formValues.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    Last Name <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formValues.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="checkout-label-title">
                    Company Name{" "}
                    <span style={{ color: "#929FA5" }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Enter your company name"
                    value={formValues.companyname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "100%" }}>
                  <label className="checkout-label-title">
                    Address <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="flat / street address / village"
                    value={formValues.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    Country <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    value={formValues.country}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    State <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formValues.state}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    City <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formValues.city}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">
                    Pincode <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formValues.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "50%" }}>
                  <label className="checkout-label-title">
                    Email <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="checkout-label-title">
                    Mobile Number <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    name="phonenumber"
                    placeholder="Enter mobile number"
                    value={formValues.phonenumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkout-section-shipping-option">
                <input type="checkbox" id="ship-different" />
                <label htmlFor="ship-different">
                  Ship to a different address
                </label>
              </div>
            </form>

            <div className="shopping-cart-price-card">
              <h6>Payment Option</h6>
              <div className="checkout-section-payment-options">
                {[
                  { value: "cod", img: CODImage, label: "Cash on Delivery" },
                  { value: "razorpay", img: Razorpay, label: "Razorpay" },
                  { value: "upi", img: upiLogo, label: "UPI" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`option ${
                      selectedOption === option.value ? "active" : ""
                    }`}
                    onClick={() => handleSelection(option.value)}
                  >
                    <img src={option.img} alt={option.label} />
                    <p>{option.label}</p>
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedOption === option.value}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="checkout-section-additional-information">
              <h6>Additional Information</h6>
              <div className="checkout-form-container-group">
                <div style={{ width: "100%" }}>
                  <label className="checkout-label-title">
                    Order Notes{" "}
                    <span style={{ color: "#929FA5" }}>(Optional)</span>
                  </label>
                  <textarea
                    name="ordernotes"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-container-order-price-summery">
            <div className="shopping-cart-price-card coupon-code">
              <h6>Coupon Code</h6>
              <input
                type="text"
                className="coupon-input"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                className="apply-coupon-btn secondary-btn"
                onClick={handleApplyCoupon}
              >
                APPLY COUPON
              </button>
            </div>
            <div className="shopping-cart-price-card">
              <h6>Order Summary</h6>
              <div
                className="order-summery-product-list"
                onMouseEnter={(e) => {
                  e.currentTarget.style.overflowY = "auto";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.overflowY = "hidden";
                }}
              >
                {displayItems.length > 0 ? (
                  displayItems.map((item, index) => (
                    <div className="order-summery-product" key={index}>
                      <img
                        src={`/upload/${getFirstImage(item.image)}`}
                        alt={item.slogan || item.name}
                      />
                      <div className="order-summery-product-details">
                        <p className="order-summery-product-title">
                          {item.slogan || item.name}
                          {item.memory && item.storage
                            ? ` (${item.memory}/${item.storage} GB)`
                            : ""}
                        </p>
                        <p className="order-summery-product-price">
                          {item.quantity} x <span>₹{item.final_price}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items selected</p>
                )}
              </div>

              <div className="shopping-cart-price-row">
                <span>Sub-total</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="shopping-cart-price-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              {couponDiscount > 0 && (
                <div className="shopping-cart-price-row">
                  <span>Coupon Discount</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="shopping-cart-price-row product-total-price">
                <span>Total</span>
                <span>
                  <b>₹{total}</b>
                </span>
              </div>

              <button
                type="button"
                className="shopping-cartcheckout-btn primary-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;

