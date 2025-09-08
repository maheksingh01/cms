const jwt = require("jsonwebtoken");

//Import the model of student where u are storing the json web token
const Student = require("../models/student");


const student_auth = async (req, res, next)=> {
    try{
        const token = req.cookies.student_jwt;
        if (!token) return res.redirect("/login");
        // res.json({msg:"You are not authorised to access this page"});

        const verifyStudent = jwt.verify(token, process.env.SECRET_KEY);

        const studentDetail = await Student.findOne({_id: verifyStudent._id});

        req.token = token;
        req.user = studentDetail;
        next();
    }
    catch(err){
        console.log(err);
    }
}


module.exports = student_auth;

