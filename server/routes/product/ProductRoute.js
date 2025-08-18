const express = require("express");
const router = express.Router();
const Product = require("../../controller/product/Product");
const upload = require("../../middleware/multer");

router.route("/getproductdata").get(Product.getProductData);
router.route("/getproductdatawithid/:id").get(Product.getProductDataWithId);
router.route("/addproductdata").post(upload.array("images"), Product.addProductData);
router.route("/editproductdata/:id").put(upload.array("images"), Product.editProductData);
router.route("/deleteproductdata/:id").delete(Product.deleteProduct);

router.get("/product/:id/variants", Product.getProductVariantData);
router.post("/product/:id/variants", Product.addSingleVariant);
router.put("/variants/:variantId", Product.updateVariant);
router.delete("/variants/:variantId", Product.deleteVariant);



module.exports = router;
