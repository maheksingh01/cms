const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "localhost", // MailHog runs locally
  port: 1025, // Default MailHog SMTP port
  secure: false, // No TLS required
  //   auth: {
  //     user: "", // No auth required for MailHog
  //     pass: "",
  //   },
});

// Function to send email

const sendComplaintEmail = async (complaintDetails) => {
  try {
    const mailOptions = {
      from: "no-reply@example.com", // You can use any email
      to: "test@example.com", // MailHog captures all emails
      subject: "Complaint Submission Confirmation",
      text: `Dear Admin,\n\nSome complaint has been received:\n\n${complaintDetails}\n\nRegards,\nE-Desk Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Complaint email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendComplaintEmail;
