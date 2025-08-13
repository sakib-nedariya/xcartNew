import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();
const port = import.meta.env.VITE_SERVER_URL;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user_id = localStorage.getItem("id"); 

  const fetchWishlist = async () => {
    if (!user_id) return;
    try {
      const res = await axios.get(`${port}wishlist/${user_id}`);
      setWishlist(res.data || []);
    } catch (error) {
      console.error("fetchWishlist error:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user_id]);

  // Add product to wishlist
  const addToWishlist = async (product) => {
    if (!user_id) {
      alert("Please login first");
      return;
    }
    try {
      await axios.post(`${port}wishlist`, {
        user_id,
        product_id: product.id,
      });
      setWishlist((prev) => [...prev, product]);
    } catch (error) {
      console.error("addToWishlist error:", error);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (product_id) => {
    if (!user_id) return;
    try {
      await axios.delete(`${port}wishlist/${user_id}/${product_id}`);
      setWishlist((prev) => prev.filter((p) => p.id !== product_id));
    } catch (error) {
      console.error("removeFromWishlist error:", error);
    }
  };

  // Check if product is wishlisted
  const isWishlisted = (product_id) =>
    wishlist.some((item) => item.id === product_id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
