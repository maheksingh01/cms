const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });


// Complain Schema
const complainSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    building: String,
    roomNumber: Number,
    complainText: String,
    userID: String,
    status: String,
    image: {type: String,
        required: false,
        default: "noImage.png"
    }
})


const Complain = mongoose.model("Complain", complainSchema);


module.exports = Complain;