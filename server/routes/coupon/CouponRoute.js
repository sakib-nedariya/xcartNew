const express = require("express");
const router = express.Router();
const Coupon = require("../../controller/coupon/Coupon");
const upload = require('../../middleware/multer')

router.route("/getcoupondata").get(Coupon.getCouponData);
router.route("/getcoupondatawithid/:id").get(Coupon.getCouponDataWithId);
router.route("/createcoupondata").post(Coupon.createCouponData);
router.route("/editcoupondata/:id").put(Coupon.editCouponData);
router.route("/deletecoupondata/:id").delete(Coupon.deleteCoupon);


// routes/coupon/CouponRoute.js

router.route("/applycoupon").post(Coupon.applyCoupon);


module.exports = router;
