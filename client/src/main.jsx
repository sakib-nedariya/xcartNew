import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
    <WishlistProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WishlistProvider>
    </CartProvider>
  </BrowserRouter>
);