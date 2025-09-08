const jwt = require("jsonwebtoken");

//Import the model of student where u are storing the json web token
const Admin = require("../models/admin");


const admin_auth = async (req, res, next)=> {
    try{
        const token = req.cookies.admin_jwt;
        if (!token) return res.redirect("/admin");
        // res.json({msg:"You are not authorised to access this page"});

        const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);

        const AdminDetail = await Admin.findOne({_id: verifyAdmin._id});

        req.token = token;
        req.user = AdminDetail;
        
        next();
    }
    catch(err){
        console.log(err);
    }
}


module.exports = admin_auth;

