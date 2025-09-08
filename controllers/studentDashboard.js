const complainData = require("../models/complain");

module.exports.stdDashboard = async function(req, res) {
  const id = req.params.id;
  const userComplain = await complainData.find({userID: id});
    // if(!req.cookies.admin_jwt){
    //   return res.render('admin');
    // }
    // else{
    //   return res.redirect('/');
    // }

    return res.render("studentDashboard", {Data: userComplain});
  }
  