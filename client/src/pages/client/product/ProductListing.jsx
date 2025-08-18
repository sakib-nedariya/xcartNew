import { useEffect, useState } from "react";
import "../../../assets/css/client/product-listing.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import axios from "axios";
import "../../../assets/css/main.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import noProductFoundImage from "../../../assets/image/no-product-found.png";
import { useWishlist } from "../../../context/WishlistContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const port = import.meta.env.VITE_SERVER_URL;

const ProductListing = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [variants, setVariants] = useState({}); // Store variants by product ID
  const [activeTab, setActiveTab] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [inputMinPrice, setInputMinPrice] = useState("");
  const [inputMaxPrice, setInputMaxPrice] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const itemsPerPage = 16;

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const res = await axios.get(`${port}getcategorydata`);
        setCategoryData(res.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    const getProductData = async () => {
      try {
        const res = await axios.get(`${port}getproductdata`);
        setProductData(res.data);
        // Fetch variants for each product
        const variantPromises = res.data.map((product) =>
          axios.get(`${port}product/${product.id}/variants`)
        );
        const variantResponses = await Promise.all(variantPromises);
        const variantsByProduct = {};
        variantResponses.forEach((response, index) => {
          variantsByProduct[res.data[index].id] = response.data || [];
        });
        setVariants(variantsByProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getCategoryData();
    getProductData();
  }, []);

  const handleTabClick = (category) => {
    setActiveTab(category);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      if (name === "min-price") {
        setInputMinPrice(value);
      } else if (name === "max-price") {
        setInputMaxPrice(value);
      }
      setSelectedPriceRange("");
    }
  };

  const handlePriceKeyDown = (e) => {
    if (e.key === "Enter") {
      const min = parseInt(inputMinPrice) || 0;
      const max = parseInt(inputMaxPrice) || 100000;
      setMinPrice(min);
      setMaxPrice(max);
      setCurrentPage(1);
    }
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setSelectedPriceRange(value);
    setInputMinPrice("");
    setInputMaxPrice("");

    switch (value) {
      case "all":
        setMinPrice(0);
        setMaxPrice(100000);
        break;
      case "under-10000":
        setMinPrice(0);
        setMaxPrice(9999);
        break;
      case "10000-20000":
        setMinPrice(10000);
        setMaxPrice(20000);
        break;
      case "20000-30000":
        setMinPrice(20000);
        setMaxPrice(30000);
        break;
      case "40000-50000":
        setMinPrice(40000);
        setMaxPrice(50000);
        break;
      case "above-50000":
        setMinPrice(50001);
        setMaxPrice(500000);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredProducts = productData
    .filter((product) => {
      const productVariants = variants[product.id] || [];
      const finalPrice =
        productVariants.length > 0 ? productVariants[0].final_price : product.price || 0;
      return (
        (!activeTab || product.cate_id === activeTab) &&
        finalPrice >= minPrice &&
        finalPrice <= maxPrice &&
        (product.name.toLowerCase().includes(searchQuery) ||
          product.slogan.toLowerCase().includes(searchQuery))
      );
    })
    .sort((a, b) => {
      const aVariants = variants[a.id] || [];
      const bVariants = variants[b.id] || [];
      const aFinalPrice = aVariants.length > 0 ? aVariants[0].final_price : a.price || 0;
      const bFinalPrice = bVariants.length > 0 ? bVariants[0].final_price : b.price || 0;
      if (sortOption === "price-low") return aFinalPrice - bFinalPrice;
      if (sortOption === "price-high") return bFinalPrice - aFinalPrice;
      return 0; // Popular (default)
    });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const toggleWishlist = (product) => {
    const productVariants = variants[product.id] || [];
    const selectedVariant = productVariants[0] || {
      id: null,
      price: product.price || 0,
      final_price: product.price || 0,
      discount: 0,
    };

    if (selectedVariant.id) {
      isWishlisted(product.id, selectedVariant.id)
        ? removeFromWishlist(product.id, selectedVariant.id)
        : addToWishlist({
            ...product,
            price: selectedVariant.price,
            final_price: selectedVariant.final_price,
            discount: selectedVariant.discount,
            memory: selectedVariant.memory,
            storage: selectedVariant.storage,
          }, selectedVariant.id);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid productlisting-page-main">
        <div className="container product-container padding-main">
          <aside className="sidebar">
            <h6>Category</h6>
            <div className="radio-group">
              <label
                className={activeTab === null ? "active" : ""}
                onClick={() => handleTabClick(null)}
              >
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={activeTab === null}
                  readOnly
                />
                <span className="custom-radio"></span> All
              </label>
              {categoryData.map((category, index) => (
                <label
                  key={index}
                  className={activeTab === category.id ? "active" : ""}
                  onClick={() => handleTabClick(category.id)}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={activeTab === category.id}
                    readOnly
                  />
                  <span className="custom-radio"></span> {category.name}
                </label>
              ))}
            </div>

            <div className="price-range">
              <p>Price Range</p>
              <div className="input">
                <input
                  style={{ padding: "8px 10px" }}
                  type="text"
                  name="min-price"
                  placeholder="Min Price"
                  value={inputMinPrice}
                  onChange={handlePriceChange}
                  onKeyDown={handlePriceKeyDown}
                />
                <input
                  style={{ padding: "8px 10px" }}
                  type="text"
                  name="max-price"
                  placeholder="Max Price"
                  value={inputMaxPrice}
                  onChange={handlePriceChange}
                  onKeyDown={handlePriceKeyDown}
                />
              </div>
            </div>

            <div className="radio-group">
              {[
                { label: "All Price", value: "all" },
                { label: "Under 10000₹", value: "under-10000" },
                { label: "10000₹ - 20000₹", value: "10000-20000" },
                { label: "20000₹ - 30000₹", value: "20000-30000" },
                { label: "40000₹ - 50000₹", value: "40000-50000" },
                { label: "Above 50000₹", value: "above-50000" },
              ].map(({ label, value }) => (
                <label
                  key={value}
                  className={selectedPriceRange === value ? "active" : ""}
                >
                  <input
                    type="radio"
                    name="price"
                    value={value}
                    checked={selectedPriceRange === value}
                    onChange={handlePriceRangeChange}
                  />
                  <span className="custom-radio"></span> {label}
                </label>
              ))}
            </div>
          </aside>

          <div className="products-with-searchbar">
            <nav className="product-navbar">
              <div className="search-select">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                <div className="select" style={{ whiteSpace: "nowrap" }}>
                  <h6>Sort By:</h6>
                  <div className="custom-dropdown">
                    <select
                      className="sort-dropdown"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="popular">Popular</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="price-low">Price: Low to High</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="result">
                  <strong>
                    {paginatedProducts.length}/{totalItems}
                  </strong>
                  &nbsp;Results Loaded
                </p>
              </div>
            </nav>

            <div
              className={`product-items ${
                paginatedProducts.length === 0 ? "no-grid" : ""
              }`}
            >
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => {
                  const productVariants = variants[product.id] || [];
                  const variant = productVariants[0] || {
                    price: product.price || 0,
                    final_price: product.price || 0,
                    discount: 0,
                  };

                  return (
                    <div
                      className="product-card"
                      key={index}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="product-img">
                        <div
                          className="heart-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          style={{
                            color: isWishlisted(
                              product.id,
                              variants[product.id]?.[0]?.id
                            )
                              ? "#3858D6"
                              : "#bbb",
                          }}
                        >
                          {isWishlisted(
                            product.id,
                            variants[product.id]?.[0]?.id
                          ) ? (
                            <IoMdHeart />
                          ) : (
                            <IoMdHeartEmpty />
                          )}
                        </div>

                        <img
                          src={`/upload/${getFirstImage(product.image)}`}
                          alt="product_image"
                        />
                      </div>
                      <div className="product-info">
                        <h6 className="slogan">
                          {product.slogan.slice(0, 35)}
                        </h6>
                        <div className="price">
                          <span className="new-price">₹{variant.final_price}</span>
                          &nbsp;
                          {variant.discount > 0 && (
                            <span className="old-price">₹{variant.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-product-found-wrapper">
                  <img
                    src={noProductFoundImage}
                    alt="No Products Found"
                    className="no-product-found-img"
                  />
                </div>
              )}
            </div>

            {totalItems > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={totalItems}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductListing;