const express = require("express");  // to import express js
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')
const connectToMongo = require("./db"); // to import the db.js file for the CONNECTtomongo function

// Other configurations and routes can go here

connectToMongo(); // Call the function to connect to MongoDB

// app. get() is a function that tells the server what to do when a get request at the given route is called.
//  It has a callback function (req, res) that listen to the incoming request req object and respond accordingly using res response object. 
//  Both req and res are made available to us by the Express framework.

// example-------------->
// app.get('/',(req,res) =>{
//   res.send('hello sahil..!')
// })

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))   // app.use('this is the url or the path for the http', require('file from which auth is imported'))
app.use('/api/note', require('./routes/note'))

// intialize the port on which app will run then app.
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
