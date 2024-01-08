const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
        name:{
            type:"string",
            required:true
        },
        email:{
            type:"string",
            required:true,
            unique:true
        },
        password:{
            type:"string",
            required:true
        },
        Date:{
            type:"date",
            default:Date.now
        },
  });

  const user = mongoose.model('user',userSchema);
//   user.createIndexes();

  module.exports =  user