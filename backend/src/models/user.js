const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type:String
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true
  },
  password: {
    type: String,
    required: true,
    min:[6,"Min 6 digit Required"]
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User