const jwt = require("jsonwebtoken");

module.exports.home = function(req, res){
    const token = req.cookies;
    const studentToken = req.cookies.student_jwt;

    const decodeToken = jwt.decode(studentToken, process.env.SECRET_KEY);
    let studentId = "To be replaced by user id if student token present";
    if(studentToken){
         studentId = decodeToken._id;
    }

    return res.render('index', {presentCookie: token, studentId: studentId});
}