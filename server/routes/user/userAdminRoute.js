const express = require("express");
const router = express.Router();
const users = require("../../controller/userInAdmin/User")

router.route("/getallusers").get(users.getAllUsers);

module.exports = router;