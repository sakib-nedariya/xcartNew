const express = require("express");
const router = express.Router();
const inquiry = require("../../controller/contact-inquiry/Inquiry")

router.route("/inquiry").post(inquiry.createContactData);
router.route("/getinquirydata").get(inquiry.getInquiryData);
router.route("/getinquirydatawithid/:id").get(inquiry.getInquiryDataWithId);
router.route("/deleteinquirydata/:id").delete(inquiry.deleteInquiry);


module.exports = router;
