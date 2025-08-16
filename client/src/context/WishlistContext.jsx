import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();
const port = import.meta.env.VITE_SERVER_URL;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  console.log(wishlist)
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

  const addToWishlist = async (product, variant_id) => {
    if (!user_id) {
      alert("Please login first");
      return;
    }
    try {
      const res = await axios.post(`${port}wishlist`, {
        user_id,
        product_id: product.id,
        variant_id, // ✅ send variant_id
      });

      if (res.data.product) {
        setWishlist((prev) => [...prev, res.data.product]);
      }
    } catch (error) {
      console.error("addToWishlist error:", error);
    }
  };

  const removeFromWishlist = async (product_id, variant_id) => {
    if (!user_id) return;
    try {
      await axios.delete(`${port}wishlist/${user_id}/${product_id}/${variant_id}`);
      setWishlist((prev) => prev.filter((p) => !(p.id === product_id && p.variant_id === variant_id)));
    } catch (error) {
      console.error("removeFromWishlist error:", error);
    }
  };

  const isWishlisted = (product_id, variant_id) =>
    wishlist.some((item) => item.id === product_id && item.variant_id === variant_id);

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
