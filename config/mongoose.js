const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true });

const db = mongoose.connection;

//If connection fails
db.on("error", console.error.bind(console, "Error Connecting to Database"));

//If successfully connected
db.once("open", function () {
  console.log("Successfully connected to Database");
});

module.exports = db;

