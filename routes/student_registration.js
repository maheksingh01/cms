const express = require("express");
const router = express.Router();

//Import Controller
const registerationController = require("../controllers/student_registration");

router.get("/", registerationController.register);
router.post("/", registerationController.register_post);


module.exports = router;
