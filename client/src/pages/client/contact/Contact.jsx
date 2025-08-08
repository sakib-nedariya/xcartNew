import { useState } from "react";
import "../../../assets/css/client/contact.css";
import Navbar from "../layout/Navbar";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import "../../../assets/css/client/login.css";
import Footer from "../layout/Footer";
import axios from "axios";
import { notifyError, notifySuccess, notifyWarning } from "../../admin/layout/ToastMessage";

const port = import.meta.env.VITE_SERVER_URL;

const Contact = () => {
  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${port}inquiry`, contactData);

      if (res.status === 201 || res.status === 200) {
        notifySuccess("Message sent successfully!");
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          mobilenumber: "",
          message: "",
        });
      } else {
        notifyWarning("Something went wrong!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      notifyError("Error sending message");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main">
          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-information">
              <div className="heading">
                <h3>Contact Information</h3>
                <p>Say something to start a live chat!</p>
              </div>

              <div className="icon-text">
                <BiSolidPhoneCall className="phone-icon" />
                <h6>+91 73569 83829</h6>
              </div>

              <div className="icon-text">
                <MdOutlineMail className="phone-icon" />
                <h6>chat@ex.iphones.com</h6>
              </div>

              <div className="icon-text">
                <IoLocationSharp className="phone-icon" />
                <h6>7th Avenue, KL ex.iphones.park, Calicut</h6>
              </div>

              <div className="social-icons">
                <FaFacebookSquare className="so-icon" />
                <FaInstagram className="so-icon" />
                <FaYoutube className="so-icon" />
                <FaTwitter className="so-icon" />
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={contactData.firstname}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={contactData.lastname}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      name="mobilenumber"
                      value={contactData.mobilenumber}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                  />
                </div>

                <button type="submit" className="btn primary-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
