const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

// Student Schema
const studentSchema = new mongoose.Schema({
  rollNumber: { type: Number, unique: true },
  studentPassword: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});



//Creating a HASH
studentSchema.pre("save", async function(next){

  //If only the password is modified then we create a new hash otherwise same
  if(this.isModified("studentPassword")){
    this.studentPassword = await bcrypt.hash(this.studentPassword, 10);
  }

  next();
});



//Generating the json web token
studentSchema.methods.generateAuthToken = async function () {
  try {
    const newtoken = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);

    this.tokens = this.tokens.concat({token: newtoken});
    await this.save(); //saving the new token in db
    return newtoken;
  } 

  catch (err) {
    console.log("Error:", err);
  }
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
