const express = require("express");
const router = express.Router();

const student_auth = require("../middleware/student_auth");
const admin_Auth = require("../middleware/admin_auth");

const logout_controller = require("../controllers/logout_controller");


router.get("/student", student_auth, logout_controller.student_logout);
router.get("/admin", admin_Auth, logout_controller.admin_logout);



module.exports = router;
