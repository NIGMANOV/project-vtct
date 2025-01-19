const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  fullname: String,
  roles: { 
    type: String,
    required: true,
    enum: ['admin', 'superadmin']
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
