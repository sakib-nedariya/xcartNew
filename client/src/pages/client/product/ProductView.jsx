import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // Add useLocation
import "../../../assets/css/client/product-view.css";
import "../../../assets/css/main.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCart } from "../../../context/CartContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useWishlist } from "../../../context/WishlistContext";

const port = import.meta.env.VITE_SERVER_URL;

const ProductView = () => {
  const { id } = useParams();
  const { state } = useLocation(); // Get navigation state
  const [productData, setProductData] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const toggleWishlist = () => {
    if (selectedVariant) {
      isWishlisted(productData.id, selectedVariant.id)
        ? removeFromWishlist(productData.id, selectedVariant.id)
        : addToWishlist(
            {
              ...productData,
              price: selectedVariant.price,
              final_price: selectedVariant.final_price,
              discount: selectedVariant.discount,
              memory: selectedVariant.memory,
              storage: selectedVariant.storage,
            },
            selectedVariant.id
          );
    }
  };

  const handleAddToCart = () => {
  if (selectedVariant) {
    addToCart(
      {
        ...productData,
        price: selectedVariant.price,
        final_price: selectedVariant.final_price,
        discount: selectedVariant.discount,
        memory: selectedVariant.memory,
        storage: selectedVariant.storage,
      },
      selectedVariant.id,
      quantity
    );
  }
};

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdatawithid/${id}`);
      const product = res.data[0];
      setProductData(product);

      if (product?.image) {
        const images = JSON.parse(product.image);
        if (Array.isArray(images)) {
          setSelectedImage(images[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getVariants = async () => {
    try {
      const res = await axios.get(`${port}product/${id}/variants`);
      const variantData = res.data || [];
      setVariants(variantData);

      if (state?.variant_id && variantData.length > 0) {
        const matchedVariant = variantData.find(
          (variant) => variant.id === state.variant_id
        );
        setSelectedVariant(matchedVariant || variantData[0]);
      } else if (variantData.length > 0) {
        setSelectedVariant(variantData[0]);
      }
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  useEffect(() => {
    getProductData();
    getVariants();
  }, [id]);

  if (!productData || !selectedVariant) {
    return <div>Loading...</div>;
  }

  const images = productData.image
    ? Array.isArray(productData.image)
      ? productData.image
      : JSON.parse(productData.image)
    : [];

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color">
        <div className="container padding-main product-view-container">
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
                    alt={productData.name || "Product Image"}
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
              <h5>{productData.name}</h5>
              <div className="view-product-info">
                <p>
                  Brand: <b>{productData.brand_name}</b>
                </p>
                <p>
                  Category: <b>{productData.cate_name}</b>
                </p>
              </div>

              <div className="price-discount">
                <div className="price">
                  <span className="new-price">
                    ₹{selectedVariant.final_price}
                  </span>
                  {selectedVariant.discount > 0 && (
                    <span className="old-price">₹{selectedVariant.price}</span>
                  )}
                </div>
                {selectedVariant.discount > 0 && (
                  <div className="discount">
                    <span>{selectedVariant.discount}% OFF</span>
                  </div>
                )}
              </div>

              <div className="form-group form-first-child">
                <label style={{ color: "black" }}>Variants:</label>
                <div className="variant-buttons">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`variant-btn ${
                        selectedVariant.id === variant.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.memory}/{variant.storage} GB
                    </button>
                  ))}
                </div>
              </div>

              <div className="cart-actions">
                <div className="product-actions">
                  <div className="quantity-selector">
                    <HiMinusSm
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                    />
                    <span>{quantity}</span>
                    <HiPlusSm onClick={() => setQuantity((prev) => prev + 1)} />
                  </div>
                  <button
                    className="secondary-btn product-add-to-cart-btn"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>

                <div className="buy-now-icon">
                  <button className="primary-btn buy-now">Buy Now</button>
                  <button
                    className="bookmark-btn"
                    onClick={toggleWishlist}
                    style={{
                      color: isWishlisted(productData.id, selectedVariant.id)
                        ? "#3858D6"
                        : "#bbb",
                    }}
                  >
                    {isWishlisted(productData.id, selectedVariant.id) ? (
                      <IoMdHeart size={28} />
                    ) : (
                      <IoMdHeartEmpty size={28} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="product-view-page-product-description content">
            <h6>Description</h6>
            <p>{productData.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductView;
