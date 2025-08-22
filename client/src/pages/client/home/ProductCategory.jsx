import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useWishlist } from "../../../context/WishlistContext";

const port = import.meta.env.VITE_SERVER_URL;

const ProductCategory = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [variants, setVariants] = useState({});
  const { addToCart } = useCart();
  const [addedProductIds, setAddedProductIds] = useState([]);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const toggleWishlist = (product) => {
    const productVariants = variants[product.id] || [];
    const defaultVariant = productVariants[0]; // Select the first variant as default
    if (!defaultVariant) {
      console.error("No variants available for this product");
      return;
    }

    if (isWishlisted(product.id, defaultVariant.id)) {
      removeFromWishlist(product.id, defaultVariant.id);
    } else {
      addToWishlist(
        {
          ...product,
          price: defaultVariant.price,
          final_price: defaultVariant.final_price || defaultVariant.price,
          discount: defaultVariant.discount || 0,
          memory: defaultVariant.memory,
          storage: defaultVariant.storage,
        },
        defaultVariant.id
      );
    }
  };

  const handleAddToCart = (product) => {
  const productVariants = variants[product.id] || [];
  const variant = productVariants[0] || { id: null, price: 0 };
  if (!variant.id) {
    console.error("No variant available for this product");
    return;
  }
  addToCart(
    {
      ...product,
      price: variant.price,
      final_price: variant.final_price || variant.price,
      discount: variant.discount || 0,
      memory: variant.memory,
      storage: variant.storage,
    },
    variant.id
  );
  if (!addedProductIds.includes(product.id)) {
    setAddedProductIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  }
};

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const fetchData = async () => {
    try {
      const [categoryRes, productRes] = await Promise.all([
        axios.get(`${port}getcategorydata`),
        axios.get(`${port}getproductdata`),
      ]);

      const allCategories = categoryRes.data;
      const allProducts = productRes.data;

      setProductData(allProducts);

      // Fetch variants for each product
      const variantPromises = allProducts.map((product) =>
        axios.get(`${port}product/${product.id}/variants`)
      );
      const variantResponses = await Promise.all(variantPromises);
      const variantsByProduct = {};
      variantResponses.forEach((response, index) => {
        variantsByProduct[allProducts[index].id] = response.data || [];
      });
      setVariants(variantsByProduct);

      const filteredCategories = allCategories.filter((category) =>
        allProducts.some((product) => product.cate_id === category.id)
      );

      setCategoryData(filteredCategories);

      if (filteredCategories.length > 0) {
        setActiveTab(filteredCategories[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  const filteredProducts = productData.filter(
    (product) => product.cate_id === activeTab
  );

  return (
    <>
      <section
        className="container-fluid product-category-section"
        style={{ backgroundColor: "var(--light-white-color)" }}
      >
        <div className="container padding-main">
          <div className="product-category-tab">
            <div className="product-category-header ">
              <h5>Popular Products</h5>
              <div className="tab-container">
                {categoryData.length > 0 ? (
                  categoryData.map((category, index) => (
                    <div
                      key={index}
                      className={`tab ${
                        activeTab === category.id ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(category.id)}
                    >
                      {category.name}
                    </div>
                  ))
                ) : (
                  <div>Loading categories...</div>
                )}
              </div>
            </div>

            <div className="product-category-image-with-price">
              {filteredProducts.slice(0, 5).map((product, index) => {
                const productVariants = variants[product.id] || [];
                const variant = productVariants[0] || { price: 0 };
                const displayedPrice = variant.price || 0;

                return (
                  <div key={index} className="product-card">
                    <div
                      className="heart-icon"
                      onClick={() => toggleWishlist(product)}
                      style={{
                        color: isWishlisted(product.id, variant.id)
                          ? "#3858D6"
                          : "#bbb",
                      }}
                    >
                      {isWishlisted(product.id, variant.id) ? (
                        <IoMdHeart />
                      ) : (
                        <IoMdHeartEmpty />
                      )}
                    </div>

                    <img
                      src={`/upload/${getFirstImage(product.image)}`}
                      alt="product_image"
                      className="product-image"
                      onClick={() => handleProductClick(product.id)}
                    />
                    <div
                      className="about-categorty-products"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <h6 className="product-name">
                        {product.slogan.slice(0, 20)}...
                      </h6>
                      <p className="product-price">₹{displayedPrice}</p>
                    </div>

                    <button
                      className={`primary-btn homepage-add-to-cart-btn fancy-cart-btn ${
                        addedProductIds.includes(product.id) ? "added" : ""
                      }`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedProductIds.includes(product.id) ? (
                        "✓ Added"
                      ) : (
                        <>
                          <FiShoppingCart /> Add to cart
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
