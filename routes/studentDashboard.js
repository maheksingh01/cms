const express = require("express");
const router = express.Router();
const student_Auth = require("../middleware/student_auth");


//Import student Dashboard controller
const studentDashboard = require("../controllers/studentDashboard");


router.get("/:id", student_Auth , studentDashboard.stdDashboard);


module.exports = router;