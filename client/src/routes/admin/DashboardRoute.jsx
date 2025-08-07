import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../assets/css/main.css";
import Login from "../../pages/admin/AdminLogin/AdminLogin";
import Dashboard from "../../pages/admin/dashboard/Dashboard";

import Product from "../../pages/admin/product/Product";
import AddProduct from "../../pages/admin/product/AddProduct";
import EditProduct from "../../pages/admin/product/Editproduct";
import ViewProduct from "../../pages/admin/product/ViewProduct";

import Brand from "../../pages/admin/brand/Brand";
import AddBrand from "../../pages/admin/brand/AddBrand";
import EditBrand from "../../pages/admin/brand/EditBrand";
import ViewBrand from "../../pages/admin/brand/ViewBrand";

import Category from "../../pages/admin/category/Category";
import AddCategory from "../../pages/admin/category/AddCategory";
import EditCategory from "../../pages/admin/category/EditCategory";
import ViewCategory from "../../pages/admin/category/ViewCategory";

import Order from "../../pages/admin/orders/Order";

import Coupon from "../../pages/admin/coupon/Coupon";
import CreateCoupon from "../../pages/admin/coupon/CreateCoupon";
import EditCoupon from "../../pages/admin/coupon/EditCoupon";
import ViewCoupon from "../../pages/admin/coupon/ViewCoupon";

import ManageAdmin from "../../pages/admin/manage_admin/ManageAdmin";
import AddNewAdmin from "../../pages/admin/manage_admin/AddNewAdmin";
import EditAdmin from "../../pages/admin/manage_admin/EditAdmin";
import ViewAdmin from "../../pages/admin/manage_admin/ViewAdmin";

import Customer from "../../pages/admin/customers/Customer";
import AddNewCustomer from "../../pages/admin/customers/AddNewCustomer";
import EditCustomer from "../../pages/admin/customers/EditCustomer";
import ViewCustomer from "../../pages/admin/customers/ViewCustomer";

import ScrollToTop from "../../Components/ScrollToTop";

import Users from "../../pages/admin/users/Users";
import ViewUsers from "../../pages/admin/users/ViewUsers";

import Inquiry from "../../pages/admin/inquiry/Inquiry";
import ViewInquiry from "../../pages/admin/inquiry/ViewInquiry";

const DashboardRoute = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/view-product/:id" element={<ViewProduct />} />

        <Route path="/admin/brand" element={<Brand />} />
        <Route path="/admin/add-brand" element={<AddBrand />} />
        <Route path="/admin/edit-brand/:id" element={<EditBrand />} />
        <Route path="/admin/view-brand/:id" element={<ViewBrand />} />

        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/edit-category/:id" element={<EditCategory />} />
        <Route path="/admin/view-category/:id" element={<ViewCategory />} />

        <Route path="/admin/orders" element={<Order />} />

        <Route path="/admin/coupon" element={<Coupon />} />
        <Route path="/admin/create-coupon" element={<CreateCoupon />} />
        <Route path="/admin/edit-coupon/:id" element={<EditCoupon />} />
        <Route path="/admin/view-coupon/:id" element={<ViewCoupon />} />

        <Route path="/admin/manage-admins" element={<ManageAdmin />} />
        <Route path="/admin/add-new-admin" element={<AddNewAdmin />} />
        <Route path="/admin/edit-admin/:id" element={<EditAdmin />} />
        <Route path="/admin/view-admin/:id" element={<ViewAdmin />} />

        <Route path="/admin/customers" element={<Customer />} />
        <Route path="/admin/add-new-customer" element={<AddNewCustomer />} />
        <Route path="/admin/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/admin/view-customer/:id" element={<ViewCustomer />} />

        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/view-user/:id" element={<ViewUsers />} />

        <Route path="/admin/inquiry" element={<Inquiry />} />
        <Route path="/admin/inquiry/view-inquiry" element={<ViewInquiry />} />
      </Routes>
    </>
  );
};

export default DashboardRoute;
