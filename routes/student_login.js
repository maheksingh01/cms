const express = require("express");
const router = express.Router();

//Import Controller
const student_login = require("../controllers/student_login");

router.get("/", student_login.login);
router.post("/", student_login.login_post);


module.exports = router;
