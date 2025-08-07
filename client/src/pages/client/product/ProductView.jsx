import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/css/client/product-view.css";
import "../../../assets/css/main.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const port = import.meta.env.VITE_SERVER_URL;

const ProductView = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdatawithid/${id}`);
      const product = res.data[0];
      setProductData([product]);

      if (product?.image) {
        const images = JSON.parse(product.image);
        if (Array.isArray(images)) {
          setSelectedImage(images[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  if (productData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main product-view-container">
          {productData.map((product) => {
            const images = product.image ? JSON.parse(product.image) : [];

            return (
              <div key={product.id}>
                <div className="product-view-section">
                  <div className="product-view-image-slider-div">
                    <div className="view-page-image-main-div">
                      <div className="view-image">
                        <img
                          src={
                            selectedImage
                              ? `/upload/${selectedImage}`
                              : "/path-to-default-image/default.png"
                          }
                          alt={product.name || "Product Image"}
                        />
                      </div>
                    </div>

                    <div className="products-slider-images">
                      <Swiper
                        slidesPerView={7}
                        slidesPerGroup={2}
                        spaceBetween={10}
                        navigation={true}
                        grabCursor={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                      >
                        {images.map((img, index) => (
                          <SwiperSlide key={index}>
                            <div
                              className={`image-section ${
                                selectedImage === img ? "active-thumb" : ""
                              }`}
                              onClick={() => setSelectedImage(img)}
                            >
                              <img
                                src={`/upload/${img}`}
                                alt={`Product Thumb ${index + 1}`}
                                className="no-product-found-img"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>

                  <div className="view-product-content">
                    <h5>{product.name}</h5>
                    <div className="view-product-info">
                      <p>
                        Brand: <b>{product.brand_name}</b>
                      </p>
                      <p>
                        Category: <b>{product.cate_name}</b>
                      </p>
                    </div>

                    <div className="price-discount">
                      <div className="price">
                        <span className="new-price">₹{product.price}</span>
                        <span className="old-price">₹1,20,000</span>
                      </div>
                      <div className="discount">
                        <span>{product.discount}% OFF</span>
                      </div>
                    </div>

                    <div className="form-group form-first-child">
                      <label htmlFor="memory">Memory</label>
                      <select name="memory" id="memory">
                        <option value="">{product.memory}</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="size">Size</label>
                      <select name="storage" id="storage">
                        <option value="">1TB SSD Storage</option>
                        <option value="">3TB SSD Storage</option>
                        <option value="">5TB SSD Storage</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="storage">Storage</label>
                      <select name="size" id="size">
                        <option value="">{product.storage}</option>
                      </select>
                    </div>

                    <div className="cart-actions">
                      <div className="product-actions">
                        <div className="quantity-selector">
                          <HiMinusSm />
                          <span>01</span>
                          <HiPlusSm />
                        </div>
                        <button
                          className="secondary-btn product-add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add To Cart
                        </button>
                      </div>

                      <div className="buy-now-icon">
                        <button className="primary-btn buy-now">Buy Now</button>
                        <button className="bookmark-btn">
                          <FiHeart size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-view-page-product-description content">
                  <h6>Description</h6>
                  <p>{product.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductView;
