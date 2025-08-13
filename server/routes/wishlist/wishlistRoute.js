const express = require("express");
const router = express.Router();
const Wishlist = require("../../controller/wishlist/Wishlist");

router.route("/wishlist").post(Wishlist.addToWishlist);
router.route("/wishlist/:user_id/:product_id").delete(Wishlist.removeFromWishlist);
router.route("/wishlist/:user_id").get(Wishlist.getWishlistByUserId);

module.exports = router;
