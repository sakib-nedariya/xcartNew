import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import "../../../assets/css/client/checkout.css";
import CODImage from "../../../assets/image/CashOnDelivery.png";
import Razorpay from "../../../assets/image/razorpay.png";
import MyWallet from "../../../assets/image/MyWallet.png";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useCart } from "../../../context/CartContext";

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleSelection = (option) => setSelectedOption(option);
  const { cartItems } = useCart();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry]);

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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

  const discount = 999;
  const tax = 2999;
  const total = getSubtotal() + tax - discount;

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
                  <label className="checkout-label-title">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                  />
                </div>
                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">Last Name</label>
                  <input type="text" name="lastname" placeholder="Last Name" />
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
                  />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "100%" }}>
                  <label className="checkout-label-title">Address</label>
                  <input type="text" name="address" placeholder="" />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">Country</label>
                  <select
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Country...
                    </option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">Region/State</label>
                  <select
                    name="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                  >
                    <option value="" disabled>
                      Select State...
                    </option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">City</label>
                  <select
                    name="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                  >
                    <option value="" disabled>
                      Select City...
                    </option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: "25%" }}>
                  <label className="checkout-label-title">Zip Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Enter Zip Code"
                  />
                </div>
              </div>

              <div className="checkout-form-container-group">
                <div style={{ width: "50%" }}>
                  <label className="checkout-label-title">Email</label>
                  <input type="text" name="email" placeholder="" />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="checkout-label-title">Mobile Number</label>
                  <input type="text" name="phonenumber" placeholder="" />
                </div>
              </div>

              <div className="checkout-section-shipping-option">
                <input type="checkbox" id="ship-different" />
                <label htmlFor="ship-different">
                  Ship into different address
                </label>
              </div>
            </form>

            <div className="shopping-cart-price-card">
              <h6>Payment Option</h6>
              <div className="checkout-section-payment-options">
                {[
                  { value: "cod", img: CODImage, label: "Cash on Delivery" },
                  { value: "razorpay", img: Razorpay, label: "Razorpay" },
                  { value: "wallet", img: MyWallet, label: "My Wallet" },
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
                {cartItems.map((item) => (
                  <div className="order-summery-product" key={item.id}>


                    <img
                      src={`/upload/${getFirstImage(item.image)}`}
                       alt={item.slogan}
                    />

                    <div className="order-summery-product-details">
                      <p className="order-summery-product-title">
                        {item.slogan}
                      </p>
                      <p className="order-summery-product-price">
                        {item.quantity} x <span>₹{item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shopping-cart-price-row">
                <span>Sub-total</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Discount</span>
                <span>₹{discount}</span>
              </div>
              <div className="shopping-cart-price-row">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
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
