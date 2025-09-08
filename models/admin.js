const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });


//  Admin Schema
const adminSchema = new mongoose.Schema({
    adminEmail: {type:String, unique:true},
    adminPassword: String,
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
});

//Create a Hash
adminSchema.pre("save", async function(next){
  if(this.isModified("adminPassword")){
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  }
  next();
});


//Generating the json web token
adminSchema.methods.generateAuthToken = async function () {
    try {
      const admintoken = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
  
      this.tokens = this.tokens.concat({token: admintoken});
      await this.save(); //saving the new token in db
      return admintoken;
    } 
  
    catch (err) {
      console.log("Error:", err);
    }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;