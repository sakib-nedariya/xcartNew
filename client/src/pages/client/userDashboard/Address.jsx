import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/address.css";
import Footer from "../layout/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

const Address = () => {
  const [showShipping, setShowShipping] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div">
            <div className="userdashboard_main_content_div_address">
              <div
                className="address-input"
                onClick={() => setShowShipping(!showShipping)}
                style={{ cursor: "pointer" }}
              >
                <span>Shipping Address</span>
                {showShipping ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {showShipping && (
                <div className="address-form">
                  <form action="">
                    <div className="flex">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="first-name"
                          placeholder="First Name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="last-name"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Company Name <span>(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Road No. 13/x, House No. 1384/C, Flat No. 5D"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select id="country">
                        <option>Bangladesh</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">Region/State</label>
                      <select id="state">
                        <option value="">Kerala</option>
                        <option>Gujarat</option>
                        <option>Maharashtra</option>
                        <option>Rajasthan</option>
                      </select>
                    </div>

                    <div className="flex">
                      <div className="form-group">
                        <label>City</label>
                        <select id="city">
                          <option value="">Palanpur</option>
                          <option>Ajmer</option>
                          <option>Aurangabad</option>
                          <option>Ahmedabad</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zip-code"
                          placeholder="385210"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="xyz@gmail.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="number"
                        name="mobile-number"
                        placeholder="+91 73569 83829"
                      />
                    </div>

                    <button className="primary-btn">Save Changes</button>
                  </form>
                </div>
              )}
            </div>

            <div className="userdashboard_main_content_div_address">
              <div
                className="address-input"
                onClick={() => setShowBilling(!showBilling)}
                style={{ cursor: "pointer" }}
              >
                <span>Billing Address</span>
                {showBilling ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {showBilling && (
                <div className="address-form">
                  <form action="">
                    <div className="flex">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="first-name"
                          placeholder="First Name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="last-name"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Company Name <span>(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Road No. 13/x, House No. 1384/C, Flat No. 5D"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select id="country">
                        <option>Bangladesh</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">Region/State</label>
                      <select id="state">
                        <option value="">Kerala</option>
                        <option>Gujarat</option>
                        <option>Maharashtra</option>
                        <option>Rajasthan</option>
                      </select>
                    </div>

                    <div className="flex">
                      <div className="form-group">
                        <label>City</label>
                        <select id="city">
                          <option value="">Palanpur</option>
                          <option>Ajmer</option>
                          <option>Aurangabad</option>
                          <option>Ahmedabad</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zip-code"
                          placeholder="385210"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="xyz@gmail.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="number"
                        name="mobile-number"
                        placeholder="+91 73569 83829"
                      />
                    </div>

                    <button className="primary-btn">Save Changes</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;
