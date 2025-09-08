const express = require("express");
const router = express.Router();
const admin_Auth = require("../middleware/admin_auth");

//Import Admin controller
const adminController = require("../controllers/admin");

router.get("/", adminController.admin);
router.post("/", adminController.admin_post);

router.get("/adminDashboard" , admin_Auth, adminController.adminDashboard);
router.post("/delete", adminController.adminDashboard_delete);
router.post("/update", adminController.adminDashboard_update);

module.exports = router;



