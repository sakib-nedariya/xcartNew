const express = require("express");
const router = express.Router();
const Wishlist = require("../../controller/wishlist/Wishlist");

// Add to wishlist
router.route("/wishlist").post(Wishlist.addToWishlist);

// Remove from wishlist
router.route("/wishlist/:user_id/:product_id").delete(Wishlist.removeFromWishlist);

// Get wishlist by user
router.route("/wishlist/:user_id").get(Wishlist.getWishlistByUserId);

module.exports = router;
