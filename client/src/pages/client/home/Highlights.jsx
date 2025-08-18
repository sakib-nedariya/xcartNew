import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";

const Highlights = () => {
  return (
   <>
    <section className="brand_collection_section service-section">
      <div className="container brand_collection padding-main">
         <div class="service-highlights">
          <div class="highlight-item">
            <span><TbTruckDelivery /></span>
            <div class="highlight-text">
              <h6>Fasted Delivery</h6>
              <p>Delivery in 24/H</p>
            </div>
          </div>

          <div class="highlight-item">
                <span><MdOutlineWatchLater /></span>
            <div class="highlight-text">
              <h6>24 Hours Return</h6>
              <p>Money back guarantee</p>
            </div>
          </div>

          <div class="highlight-item">
                <span><IoCardOutline /></span>
            <div class="highlight-text">
              <h6>Secure Payment</h6>
              <p>Your payment is safe</p>
            </div>
          </div>

          <div class="highlight-item">
                <span><RiCustomerService2Line /></span>
            <div class="highlight-text">
              <h6>Support 24/7</h6>
              <p>Live contact/message</p>
            </div>
          </div>
        </div>
      </div>
      </section>

      <section>
        
      </section>
   </>
  )
}


export default Highlights;