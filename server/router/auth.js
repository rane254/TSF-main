// Import the 'express' module
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Connect to MongoDB using the connection details in 'db/conn.js'
require('../db/conn');

// Define a User variable to acquire data from userSchema
const User = require('../models/registerSchema');

// using async await
// Define a route for user registration (HTTP POST request)
// The 'async' keyword indicates that this route handler contains asynchronous operations.
// It allows the use of 'await' within the function, making it possible to handle asynchronous tasks such as database operations.
// This is important here because the code involves database queries and operations that may take time to complete.
router.post('/register', async (request, response) => {
    // Destructure data from the request body
    const { name, email, password, cpassword } = request.body;

    // Check if all required fields are filled
    if (!name || !email || !password || !cpassword) {
        // Return a 422 Unprocessable Entity status with an error message
        return response.status(422).json({ error: 'Please fill all fields!' });
    }
    
    if (password !== cpassword) {
        return response.status(422).json({ error: "Passwords don't match"});
    }

    try {
        // Check if a user with the provided email already exists in the database
        // The 'await' keyword is used here to pause the execution of code until the asynchronous operation (database query) is complete.
        // It ensures that the 'User.findOne' operation is finished before moving on to the next line.
        // This helps in handling the result of the query (whether a user with the provided email exists) before proceeding.
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            // Return a 422 Unprocessable Entity status with an error message if the email is already registered
            return response.status(422).json({ error: 'Email already exists!' });
        }

        // Create a new user instance with the provided data
        const user = new User({ name, email, password, cpassword });

        // Save the user data to the database
        // Similarly, 'await' is used here to pause execution until the asynchronous operation of saving user data is complete.
        // This ensures that the user data is successfully saved to the database before moving on to the next steps.
        await user.save();

        // Return a 201 Created status with a success message if the user is registered successfully
        response.status(201).json({ message: 'User registered successfully.' });
        console.log(user.name,', new user registered successfully.');

    }
    catch (error) {
        // Handle any errors that might occur during the findOne and user.save operation
        console.log(error);
    }
});

module.exports = router;