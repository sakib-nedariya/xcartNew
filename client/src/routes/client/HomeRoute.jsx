import { Route, Routes } from "react-router-dom";
import Home from "../../pages/client/home";
import Contact from "../../pages/client/contact/Contact";
import Product from "../../pages/client/product/ProductListing";
import ProductView from "../../pages/client/product/ProductView";
import ShoppingCart from "../../pages/client/cart/ShoppingCart";
import Checkout from "../../pages/client/cart/Checkout";
import Login from "../../pages/client/login/Login";
import Signup from "../../pages/client/login/Signup";
import WishList from "../../pages/client/userDashboard/WishList";
import Dashboard from "../../pages/client/userDashboard/Dashboard";
import OrderHistory from "../../pages/client/userDashboard/OrderHistory";
import Address from "../../pages/client/userDashboard/Address";
import AccountDetails from "../../pages/client/userDashboard/AccountDetails";

import AuthGuard from "../../Auth/AuthGuard";
import PageGuard from "../../Auth/PageGuard";

const HomeRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/shopping-cart" element={<AuthGuard><ShoppingCart /></AuthGuard>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<PageGuard><Login /></PageGuard>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<AuthGuard><WishList /></AuthGuard>} />
        <Route path="/user-dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/order-history" element={<AuthGuard><OrderHistory /></AuthGuard>} />
        <Route path="/user-address" element={<AuthGuard><Address /></AuthGuard>} />
        <Route path="/user-account-details" element={<AuthGuard><AccountDetails /></AuthGuard>} />
      </Routes>
    </>
  );
};

export default HomeRoute;
