const express = require("express");
const router = express.Router();
const Customer = require("../../controller/customer/Customer");
const upload = require('../../middleware/multer')

router.route("/getcustomerdata").get(Customer.getCustomerData);
router.route("/getcustomerdatawithid/:id").get(Customer.getCustomerDataWithId);
router.route("/addcustomerdata").post(upload.single("profile"), Customer.addCustomerData);
router.route("/editcustomerdata/:id").put(upload.single("profile"), Customer.editCustomerData);
router.route("/deletecustomerdata/:id").delete(Customer.deleteCustomer);


module.exports = router;
