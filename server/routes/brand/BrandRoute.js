const express = require("express");
const router = express.Router();
const Brand = require("../../controller/brand/Brand");
const upload = require('../../middleware/multer')

router.route("/getbranddata").get(Brand.getBrandData);
router.route("/getbranddatawithid/:id").get(Brand.getBrandDataWithId);
router.route("/addbranddata").post(upload.single("image"), Brand.addBrandData);
router.route("/editbranddata/:id").put(upload.single("image"), Brand.editBrandData);
router.route("/deletebranddata/:id").delete(Brand.deleteBrand);


module.exports = router;
