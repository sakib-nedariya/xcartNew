const express = require("express");
const router = express.Router();
const ShoppingCart = require("../../controller/shoppingCart/ShoppingCart");

router.route("/cart").post(ShoppingCart.addToCart);
router.route("/cart/:user_id/:product_id/:variant_id").delete(ShoppingCart.removeFromCart);
router.route("/cart/:user_id").get(ShoppingCart.getCartByUserId);
router.route("/cart/quantity").put(ShoppingCart.updateCartQuantity);

module.exports = router;