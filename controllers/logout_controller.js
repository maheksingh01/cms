module.exports.student_logout = async function(req, res){
    try{
        // req.user.tokens = req.user.tokens.filter((currElementdb)=> {
        //     return currElementdb.token  !== req.token;                //req.token is browser's token
        // });

        //  res.clearCookie("student_jwt");
        //  await req.user.save();

        //logout from all devices
        req.user.tokens = [];

         res.clearCookie("student_jwt");
         await req.user.save();

         res.redirect("/");

    }
    catch(err){
        console.log(err);
    }
}


module.exports.admin_logout = async function(req, res){
    try{
        // req.user.tokens = req.user.tokens.filter((currElementdb)=> {
        //     return currElementdb.token  !== req.token;                //req.token is browser's token
        // });

        //  res.clearCookie("student_jwt");
        //  await req.user.save();

        //logout from all devices
         req.user.tokens = [];

         res.clearCookie("admin_jwt");
         await req.user.save();

         res.redirect("/");

    }
    catch(err){
        console.log(err);
    }
}