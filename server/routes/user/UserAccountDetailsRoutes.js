const express = require("express");
const router = express.Router();
const userLoginController = require("../../controller/userDashController/UserLogin");
const userAccountController = require("../../controller/userDashController/UserAccount");
const upload = require("../../middleware/multer");

router.post("/signup", userLoginController.signup);
router.post("/login", userLoginController.login);

router.get("/getUserById/:id", userAccountController.getUserWithId);
router.put("/editUserData/:id", upload.single("profile"), userAccountController.editUserData);

router.put("/changePassword/:id", userAccountController.changePassword);

module.exports = router;
