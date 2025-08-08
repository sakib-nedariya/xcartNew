import Footer from "../layout/Footer";
import UserSidebar from "./UserSidebar";
import Navbar from "../layout/Navbar";
import "../../../assets/css/client/userDashboard/accDetails.css";
import default_profile from "../../../assets/image/default_profile.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../admin/layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const AccountDetails = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [profilePreview, setProfilePreview] = useState("");

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    profile: null,
    username: "",
    email: "",
    mobile_number: "",
    country: selectedCountry,
    state: selectedState,
    city: selectedCity,
    pincode: "",
  });

  const userId = localStorage.getItem("id");

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${port}getUserById/${id}`);
      const user = res.data[0];
      setUserData(user);

      setSelectedCountry(user.country);
      setSelectedState(user.state);
      setSelectedCity(user.city);

      if (user?.profile) {
        setProfilePreview(`/upload/${user.profile}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  // password change function
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return notifyWarning("Please fill in all password fields.");
    }

    if (newPassword !== confirmPassword) {
      return notifyError("Passwords do not match.");
    }

    try {
      await axios.put(`${port}changePassword/${userId}`, {
        newPassword: newPassword,
      });

      notifySuccess("Password changed successfully!");

      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change error:", error);
      notifyError("Failed to change password");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({
        ...userData,
        profile: file,
      });

      const previewURL = URL.createObjectURL(file);
      setProfilePreview(previewURL);
    }
  };

  useEffect(() => {
    return () => {
      if (profilePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("profile", userData.profile);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("mobile_number", userData.mobile_number);
    formData.append("country", selectedCountry || userData.country);
    formData.append("state", selectedState || userData.state);
    formData.append("city", selectedCity || userData.city);
    formData.append("pincode", userData.pincode);

    try {
      await axios.put(`${port}editUserData/${userId}`, formData);
      notifySuccess("Changes saved!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div">
            <div className="userdashboard_main_border">
              <h6 style={{ borderBottom: "1px solid #e4e7e9" }}>
                Account Setting
              </h6>
              <div className="user_account_details_content">
                <div
                  className="user-profile-image-wrapper"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <img
                    src={
                      profilePreview
                        ? profilePreview
                        : userData.profile
                        ? `/upload/${userData.profile}`
                        : default_profile
                    }
                    alt="user-profile"
                    className="user-profile-image-wrapper-profile-img"
                  />
                  <div className="user-profile-image-wrapper-upload-overlay">
                    <div className="user-profile-image-wrapper-upload-content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#fff"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 20h14v-2H5v2zm7-14l5 5h-3v4h-4v-4H7l5-5z" />
                      </svg>
                      <span>Upload Image</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    name="profile"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="user_profile_form">
                  <div className="user-profile-details-inner flex">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChangeInput}
                        placeholder="Enter First Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChangeInput}
                        placeholder="Enter Last Name"
                      />
                    </div>
                  </div>
                  <div className="user-profile-details-inner flex">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChangeInput}
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChangeInput}
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
 
                  <div className="user-profile-details-inner flex">
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        name="mobile_number"
                        value={userData.mobile_number}
                        onChange={handleChangeInput}
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select
                        id="country"
                        value={selectedCountry || ""}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="user-profile-details-inner flex">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <select
                        id="state"
                        value={selectedState || ""}
                        onChange={(e) => setSelectedState(e.target.value)}
                        disabled={!states.length}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <select
                        id="city"
                        value={selectedCity || ""}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!cities.length}
                      >
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Pin code</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Enter Pincode"
                        value={userData.pincode}
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>
                  <button
                    className="primary-btn user-save-changes-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div
              className="userdashboard_main_border"
              style={{ marginTop: "20px" }}
            >
              <h6 style={{ borderBottom: "1px solid #e4e7e9" }}>
                Change Password
              </h6>
              <div className="user_account_details_content">
                <div className="user_profile_form">
                  <div className="user-profile-details-inner flex">
                    <div className="form-group user-password">
                      <label>New Password</label>
                      <div className="password-wrapper">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <IoEyeOffOutline />
                          ) : (
                            <IoEyeOutline />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="user-profile-details-inner flex">
                    <div className="form-group user-password">
                      <label>Confirm Password</label>
                      <div className="password-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Enter confirm password"
                        />
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <IoEyeOffOutline />
                          ) : (
                            <IoEyeOutline />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="primary-btn user-save-changes-btn"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountDetails;
