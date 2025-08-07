const express = require("express");
const router = express.Router();
const Category = require("../../controller/category/Category");
const upload = require('../../middleware/multer')

router.route("/getcategorydata").get(Category.getCategoryData);
router.route("/getcategorydatawithid/:id").get(Category.getCategoryDataWithId);
router.route("/addcategorydata").post(upload.single("image"), Category.addCategoryData);
router.route("/editcategorydata/:id").put(upload.single("image"), Category.editCategoryData);
router.route("/deletecategorydata/:id").delete(Category.deleteCategory);


module.exports = router;
