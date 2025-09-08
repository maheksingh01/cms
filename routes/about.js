const express = require("express");
const router = express.Router();

// About Us Route
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
