const express = require("express");
const app = express.Router();

const ManageAdminRoute = require("../routes/admin/ManageAdminRoute.js");
const CustomerRoute = require("../routes/customer/CustomerRoute.js");
const CouponRoute = require("../routes/coupon/CouponRoute.js");
const BrandRoute = require("../routes/brand/BrandRoute.js");
const CategoryRoute = require("../routes/category/CategoryRoute.js");
const ProductRoute = require("../routes/product/ProductRoute.js");
const userLoginRoute = require("../routes/user/UserAccountDetailsRoutes.js");
const userAdminRoute = require("../routes/user/userAdminRoute.js");
const getUserInquiry = require("../routes/contact_inquiry/ContactInquiryRoute.js");

app.use("/", ManageAdminRoute);
app.use("/", CustomerRoute);
app.use("/", CouponRoute);
app.use("/", BrandRoute);
app.use("/", CategoryRoute);
app.use("/", ProductRoute);
app.use("/", userLoginRoute);
app.use("/", userAdminRoute);
app.use("/", getUserInquiry)

module.exports = app