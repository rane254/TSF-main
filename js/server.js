const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import the bcryptjs library
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://brijesh254:JaiBabaSwami@tsfwebsite.yn0eq7a.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the User model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

// Middleware for parsing JSON requests
app.use(express.json());

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
  return res.json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by their email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Passwords match, create a session or token for the user
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(400).json({ message: 'Invalid password' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
