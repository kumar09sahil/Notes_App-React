const mongoose = require("mongoose");  // to import mongoose file 

const URI = "mongodb://127.0.0.1:27017/enotebook"; // Use IPv6 loopback address

// mongooose.connect is a method to connect to the mongoDB server  where we pass the connection string of our server for connnection
// .then() is used when we get the desired result and .catch () is used when there is an error in doing so
const connectToMongo = () => {   
  mongoose.connect(URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

//to export the function 
module.exports = connectToMongo;

