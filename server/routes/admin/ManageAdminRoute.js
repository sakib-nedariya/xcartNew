const express = require("express");
const router = express.Router();
const ManageAdmin = require("../../controller/admin/ManageAdmin");
const upload = require('../../middleware/multer')

router.route("/getadmindata").get(ManageAdmin.getAdminData);
router.route("/getadmindatawithid/:id").get(ManageAdmin.getAdminDataWithId);
router.route("/addadmindata").post(upload.single("profile"), ManageAdmin.addAdminData);
router.route("/editadmindata/:id").put(upload.single("profile"), ManageAdmin.editAdminData);
router.route("/deleteadmindata/:id").delete(ManageAdmin.deleteAdmin);


module.exports = router;
