import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/address.css";
import Footer from "../layout/Footer";
import "../../../assets/css/main.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { notifyError, notifySuccess } from "../../admin/layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const Address = () => {
  const [showShipping, setShowShipping] = useState(true);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    mobile_number: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = storedUser?.id || localStorage.getItem("id");

  // Fetch address on page load
  useEffect(() => {
    if (loggedInUserId) {
      axios
        .get(`${port}getShippingAddress/${loggedInUserId}`)
        .then((res) => {
          setFormValues(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${port}saveShippingAddress`, {
        user_id: loggedInUserId,
        ...formValues,
      });
      notifySuccess(res.data);
    } catch (err) {
      console.error("Error saving address:", err);
      notifyError("Failed to save address");
    }
  };

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
                  <form onSubmit={handleSubmit}>
                    <div className="flex">
                      <div className="form-group">
                        <label>
                          First Name <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={formValues.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Last Name <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={formValues.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="form-group">
                        <label>
                          Email <span className="required_field">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Mobile Number{" "}
                          <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="mobile_number"
                          value={formValues.mobile_number}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Company Name <span>(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formValues.company_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Address <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex">
                      <div className="form-group">
                        <label>
                          Country <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formValues.country}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          State <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formValues.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="form-group">
                        <label>
                          City <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formValues.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Pincode <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formValues.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button className="primary-btn" type="submit">
                      Save Changes
                    </button>
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

