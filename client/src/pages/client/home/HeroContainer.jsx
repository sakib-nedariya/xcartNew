import React from "react";
import { FaSearch } from "react-icons/fa";
import HeroImage from "../../../assets/image/hero-image.png";
import "../../../assets/css/client/home.css";

const HeroContainer = () => {
  return (
    <>
      <section className="container-fluid hero-container">
        <div className="container padding-main">
          <div className="hero-container-content">
            <h1>Discover Most Affordable Electronics products</h1>
            <p>
              Find the best, reliable and affordable apple products here. We
              focus on the product quality. Here you can find all the products
              apple ever made. Even the products apple officially stopped
              selling. So why you are waiting? Just order now!
            </p>
            <div className="hero-product-search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Find the best product"
                className="search-input"
              />
              <button type="button" className="search-button primary-btn">
                Search
              </button>
            </div>
          </div>
          <div className="hero-container-image">
            <img src={HeroImage} alt="hero-image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroContainer;
