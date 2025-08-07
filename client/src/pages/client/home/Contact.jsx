import React from "react";
import NewsLetterBG from "../../../assets/image/news-bg-image.png"

const Contact = () => {
  return (
    <>
      <section className="container-fluid subscribe-newsletter-section">
        <div className="container padding-main">
          <div className="subscribe-newsletter-main-div">
            <div className="subscribe-newsletter content">
              <h3>Subscribe To Newsletter</h3>
              <p>Get free guide about smart watches daily.</p>
              <div className="subscribe-newsletter-search">
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  className="search-input"
                />
                <button type="button" className="subscribe-button primary-btn">Subscribe</button>
              </div>
            </div>
            <div className="subscribe-newsletter image">
              <img src={NewsLetterBG} alt="image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
