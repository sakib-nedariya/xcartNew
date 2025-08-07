import React from "react";
import { NavLink } from "react-router-dom";
import FooterLogo from "../../../assets/image/logo.png";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import "../../../assets/css/client/footer.css";

const Footer = () => {
  return (
    <footer className="container-fluid footer">
      <div className="container padding-main">
        <div className="footer-main-div">
          <div className="footer-feedback-content-box">
            <span>FEEDBACK</span>
            <h3>
              <span>Seeking personalized support?</span> Request a call from our
              team
            </h3>
            <div className="input-container">
              <label htmlFor="name">YOUR NAME</label>
              <input type="text" id="name" placeholder="" />
            </div>
            <div className="input-container">
              <label htmlFor="phone">Mobile Number</label>
              <input type="tel" id="phone" placeholder="" />
            </div>
            <button type="button" className="primary-btn footer-request-btn">
              Send Request
            </button>
            <div className="privacy-button">
              <NavLink>Privacy</NavLink>
            </div>
          </div>
          <div className="footer-middle-info-socialmedia-link">
            <div className="footer-info-about-content">
              <div className="footer-menu info">
                <h6>INFO</h6>
                <ul>
                  <li>Company</li>
                  <li>Products</li>
                  <li>Engineering</li>
                  <li>Services</li>
                  <li>Productions</li>
                </ul>
              </div>
              <div className="footer-menu about_us">
                <h6>ABOUT US</h6>
                <ul>
                  <li>Gallery</li>
                  <li>Technologies</li>
                  <li>Contacts</li>
                </ul>
              </div>
              <div className="footer-menu contact_us">
                <h6>CONTACT US</h6>
                <ul>
                  <li>+91 73569 83827</li>
                  <li>help@exiphones.com</li>
                  <li>Calicut, KL, INDIA</li>
                </ul>
              </div>
            </div>
            <div className="social-media-links">
              <FaFacebookSquare />
              <FaInstagram />
              <FaYoutube />
              <FaXTwitter />
            </div>
          </div>
          <div className="footer-company-logo">
            <img src={FooterLogo} alt="logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
