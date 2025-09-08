const express = require("express");
const router = express.Router();
const student_auth = require("../middleware/student_auth");

//Import Complain_Controller
const complain_controller = require("../controllers/complain_controller");
const sendComplaintEmail = require("../middleware/mailer");

const multer = require("multer"); //used for storing image in db

// Creating Storage for image storage
const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

// Handle complaint submission with email sending
router.get("/", student_auth, complain_controller.complainPage);

// New router.post code

router.post("/", upload.single("myImage"), async (req, res) => {
  try {
    // Call the original controller function to save complaint
    await complain_controller.complainPost(req, res);

    // Map frontend fields (fname, lname) to backend schema fields
    const firstName = req.body.fname || req.body.firstName;
    const lastName = req.body.lname || req.body.lastName;
    const building = req.body.building;
    const roomNumber = req.body.RoomNumber || req.body.roomNumber;
    const complainText = req.body.ComplainText || req.body.complainText;

    // Construct the email-friendly complaint details
    const complaintDetails = `
      Name: ${firstName} ${lastName}
      Building: ${building}
      Room Number: ${roomNumber}
      Complaint: ${complainText}
    `;

    // Send email with formatted complaint details
    await sendComplaintEmail(complaintDetails);

    console.log("Complaint submitted and email sent!");
    res.status(200);
    // .json({ message: "Complaint submitted and email sent successfully." });
    console.log("Complaint submitted and email sent!");
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ error: "Error submitting complaint." });
  }
});

module.exports = router;
