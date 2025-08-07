import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const port = import.meta.env.VITE_SERVER_URL;

const BrandCollection = () => {
  const [brandData, setBrandData] = useState([]);
  const sliderRef = useRef(null);

  const getBrandData = async () => {
    try {
      const res = await axios.get(`${port}getbranddata`);
      setBrandData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBrandData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section className="brand_collection_section">
      <div className="container brand_collection padding-main">
        <div className="brand_collection_header">
          <h5>Brand Collection Available</h5>
          <span className="brand-collection-slider-arrow">
            <IoMdArrowBack onClick={() => sliderRef.current.slickPrev()} />
            <IoMdArrowForward onClick={() => sliderRef.current.slickNext()} />
          </span>
        </div>
        <Slider
          ref={sliderRef}
          {...settings}
          className="brands_collection_slider"
        >
          {brandData.map((brand, index) => (
            <div key={index} className="brands-collection-with-name">
              <img src={`/upload/${brand.image}`} alt={brand.name} />
              <p>{brand.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BrandCollection;
