const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  location: String,
  password: String,
  age: Number,
  phoneNo: String,
  NIC: String,
  gender: String,
});

module.exports = model("User", userSchema);
