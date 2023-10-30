// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Other user properties...
});

module.exports = mongoose.model('User', userSchema);
