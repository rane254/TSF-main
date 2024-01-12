// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'User' collection
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: 20
    },

    email: {
        type: String,
        unique: true,
        length: 50,
        trim: true
    },

    password: {
        type: String,
        required: true,
        length: 15
    },

    cpassword: {
        type: String,
        required: true,
        length: 15
    }
});

// Create a Mongoose model named 'User' based on the defined schema
const User = mongoose.model('USER', registerSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;