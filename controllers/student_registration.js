const Student = require("../models/student");

module.exports.register = function (req, res) {
  return res.render("registration");
};

module.exports.register_post = async function (req, res) {
  try {
    const Student1 = new Student({
      rollNumber: req.body.RegisterEmail,
      studentPassword: req.body.RegisterPassword,
    });

    const newStudent = await Student1.save();
    return res.redirect("/");
  } 
  
  catch (err) {
    console.log(err);
  }
};
