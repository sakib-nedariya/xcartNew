import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  notifyError,
  notifySuccess,
} from "../../src/pages/admin/layout/ToastMessage";

const CartContext = createContext();
const port = import.meta.env.VITE_SERVER_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    tax: 2999,
    discount: 999,
    total: 0,
  });
  const user_id = localStorage.getItem("id");

  const fetchCart = async () => {
    if (!user_id) {
      setCartItems([]);
      setCartTotals({ subtotal: 0, tax: 2999, discount: 999, total: 0 });
      return;
    }
    try {
      const res = await axios.get(`${port}cart/${user_id}`);
      setCartItems(Array.isArray(res.data.items) ? res.data.items : []);
      setCartTotals(
        res.data.totals || { subtotal: 0, tax: 2999, discount: 999, total: 0 }
      );
    } catch (error) {
      console.error("fetchCart error:", error);
      setCartItems([]);
      setCartTotals({ subtotal: 0, tax: 2999, discount: 999, total: 0 });
      notifyError("Failed to fetch cart items");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user_id]);

  const addToCart = async (product, variant_id, quantity = 1) => {
    if (!user_id) {
      notifyError("Please login first");
      return;
    }
    try {
      const res = await axios.post(`${port}cart`, {
        user_id,
        product_id: product.id,
        variant_id,
        quantity,
      });
      await fetchCart(); // Refresh cart and totals
      notifySuccess("Product added to cart");
    } catch (error) {
      console.error("addToCart error:", error);
      notifyError("Failed to add to cart");
    }
  };

  const removeFromCart = async (product_id, variant_id) => {
    if (!user_id) {
      notifyError("Please login first");
      return;
    }
    try {
      await axios.delete(`${port}cart/${user_id}/${product_id}/${variant_id}`);
      await fetchCart(); // Refresh cart and totals
      notifySuccess("Product removed from cart");
    } catch (error) {
      console.error("removeFromCart error:", error);
      notifyError("Failed to remove from cart");
    }
  };

  const updateQuantity = async (product_id, variant_id, quantity) => {
    if (!user_id) {
      notifyError("Please login first");
      return;
    }
    try {
      await axios.put(`${port}cart/quantity`, {
        user_id,
        product_id,
        variant_id,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("updateQuantity error:", error);
      notifyError("Failed to update cart quantity");
    }
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotals,
        addToCart,
        cartCount,
        removeFromCart,
        updateQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
