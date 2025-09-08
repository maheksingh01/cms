const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.login = function(req, res){
    if(!req.cookies.student_jwt){
        return res.render('login');
    }
    else{
        return res.redirect('/');
    }
}


module.exports.login_post = async function(req , res){
    try{
        const foundID = await Student.findOne({rollNumber: req.body.LoginName});

            if(foundID){
                //Compare the Hash password- returning true or false
                const isMatch = await bcrypt.compare(req.body.LoginPassword, foundID.studentPassword);

                let token;
                //If password is matched
                if(isMatch){
                    //json web token is generating
                    // const token = await foundID.generateAuthToken();
                    token = await foundID.generateAuthToken();

                   //Saving the token in cookie
                    res.cookie("student_jwt", token, {
                    expires: new Date(Date.now() + 600000),    //After 60sec cookie will expire
                    httpOnly: true                            //Now client side can't touch the cookie to alter it
                    // secure: true
                });

                const tokenDecode = jwt.decode(token, process.env.SECRET_KEY);
            
                // return res.redirect("/complain");
                // return res.redirect('/student/:token');
                return res.redirect(`/student/${tokenDecode._id}`);
                }
                else{
                    //If password didn't match
                    return res.redirect('back');
                }
                
            }

            else{
            //User not found
            return res.redirect('back');
            }
    }
    catch(err){
        // console.log("Error", err);
        res.redirect('back');
    }
}