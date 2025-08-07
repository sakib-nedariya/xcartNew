import React, { useState, useEffect } from "react";
import axios from "axios";

const port = import.meta.env.VITE_SERVER_URL;

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${port}getcategorydata`);
      setCategoryData(res.data); 
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(`${port}getproductdata`);
      setProductData(res.data);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
    getProductData();
  }, []);

  // Function to count how many products belong to a category
  const getItemCount = (categoryId) => {
    return productData.filter((product) => product.cate_id === categoryId)
      .length;
  };

  return (
    <section className="brand_collection_section">
      <div className="container brand_collection padding-main">
        <div className="brand_collection_header">
          <h5>Categories</h5>
        </div>

        <div className="category-item-box">
          {categoryData.map((item, index) => {
            const count = getItemCount(item.id);
            return (
              <div className="category-card" key={index}>
                <div className="image">
                  <img src={`/upload/${item.image}`} alt={item.name} />
                </div>
                <div className="name">
                  <h6>{item.name}</h6>
                  <p>
                    {count}{" "}
                    {count === 0 ? "  " : count === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
