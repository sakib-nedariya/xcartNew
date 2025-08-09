const express = require("express");
const router = express.Router();
const userAddressController = require("../../controller/userDashController/UserAddress");

router.post("/saveShippingAddress", userAddressController.saveShippingAddress);
router.get("/getShippingAddress/:user_id", userAddressController.getShippingAddress);
router.get("/getUserAddressWithId/:id", userAddressController.getUserAddressWithId);

module.exports = router;


