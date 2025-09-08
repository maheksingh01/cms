require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(cors());

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json()); // Ensures JSON parsing
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/js")); // Fixed path issue

// Import routes
const aboutRoutes = require("./routes/about.js");
const complainRoutes = require("./routes/complain.js"); // Added complaint route

// Use routes
app.use(aboutRoutes);
app.use("/complain", complainRoutes); // Set proper route for complaints
app.use("/", require("./routes/index"));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
