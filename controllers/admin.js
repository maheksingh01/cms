const Admin = require("../models/admin");
const Complain = require("../models/complain");
const bcrypt = require("bcryptjs");



module.exports.admin = function (req, res) {
  if (!req.cookies.admin_jwt) {
    return res.render('admin');
  }
  else {
    return res.redirect('/');
  }
}


module.exports.admin_post = async function (req, res) {
  try {
    const foundID = await Admin.findOne({ adminEmail: req.body.AdminEmail });

    if (foundID) {
      //Compare the hash password-- returns true or false
      const isMatch = await bcrypt.compare(req.body.AdminPassword, foundID.adminPassword);

      if (isMatch) {
        //json web token is generating
        const token = await foundID.generateAuthToken();

        // Saving the token in cookie
        res.cookie("admin_jwt", token, {
          expires: new Date(Date.now() + 600000),    //After 60sec cookie will expire
          httpOnly: true                            //Now client side can't touch the cookie to alter it
          // secure: true
        });

        return res.redirect("/admin/adminDashboard");
      }
      else {
        //password didn't match
        return res.redirect("/admin");
      }
    }
    else {
      //User not found
      return res.redirect('back');
    }
  }
  catch (err) {
    console.log("Error", err);
  }
}


module.exports.adminDashboard = function (req, res) {

  Complain.find({}, function (err, datawhichcomeback) {
    if (err) {
      console.log(err);
    }
    else {
      return res.render("adminDashboard", { data: datawhichcomeback });
      // mongoose.connection.close();
      // mongoose.disconnect();
      //  this is used to close mongo server after showing the data.
    }
  });
}


module.exports.adminDashboard_update = async (req, res) => {
  const complainId = req.body.TargetToUpdate;

  await Complain.updateOne({ _id: complainId }, { $set: { status: "Resolved" } });

  // return res.redirect("/admin/adminDashboard");
  return res.redirect("/admin/adminDashboard");
}



module.exports.adminDashboard_delete = function (req, res) {
  const complainId = req.body.TargetToDelete;

   Complain.findByIdAndRemove(complainId, function (err) {
    if (err) {
      console.log(err);
    } else {
      return res.redirect("/admin/adminDashboard");
    }
  })
}

