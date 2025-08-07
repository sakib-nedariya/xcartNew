import React from "react";
import "../../../assets/css/client/contact.css";
import Navbar from "../layout/Navbar";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import "../../../assets/css/client/login.css";
import Footer from "../layout/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main ">
          <div className="contact-container">
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
              <form action="">
                <div className="flex">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter your firstname"
                    />
                  </div>
                  <div className="form-group">
                    <label>Second Name</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter your lastname"
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      name="mobilenumber"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    type="email"
                    name="email"
                    placeholder="Write your message... "
                  />
                </div>

                <button type="button" className="btn primary-btn">
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
