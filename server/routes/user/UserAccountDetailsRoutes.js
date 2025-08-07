const express = require("express");
const router = express.Router();
const userLoginController = require("../../controller/userLogin/UserLogin");
const userAccountController = require("../../controller/userLogin/UserAccount");
const upload = require("../../middleware/multer");

// User login and signup routes
router.post("/signup", userLoginController.signup);
router.post("/login", userLoginController.login);

// User account routes
router.get("/getUserById/:id", userAccountController.getUserWithId);
router.put("/editUserData/:id", upload.single("profile"), userAccountController.editUserData);

// ✅ Add this route for changing password
router.put("/changePassword/:id", userAccountController.changePassword);

module.exports = router;
