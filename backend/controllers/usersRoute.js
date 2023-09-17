const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

let UsersSchema = require('../models/users');
let TodoSchema = require('../models/todo');
// Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UsersSchema({ username, email, password: hashedPassword });
        await newUser.save();
        console.log("New User ID: ",newUser._id);


        // Access the _id of the newly created user
        const userId = newUser._id;

        const firstTodo = {
            title: 'Welcome Task', // Set the title
            description: 'This is your first todo task!', // Set the description
            completed: false, // Set the initial completion status
        };

        // Create an initializing todo task for the user
        const initialTodo = new TodoSchema({
            user: userId, // Associate the todo with the user
        });
        await initialTodo.save();
        
        const todo = await TodoSchema.findOneAndUpdate(
            { user: userId }, // Find the user's todo list based on their user ID
            { $push: { todos: firstTodo } }, // Add the new todo item to the 'todos' array
            // { new: true } // Return the updated user with the new todo item
        );
        
        // console.log(todo)
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});
  
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const maxAgeInSeconds = 120;  // JWT expiration time in seconds

    // Convert expiration time to milliseconds
    const maxAgeInMilliseconds = maxAgeInSeconds * 1000;

    try {
        const user = await UsersSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication Failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication Failed' });
        }

        const token = jwt.sign({ userId: user._id}, 'secretKey', { expiresIn: '120s' });
        console.log(`Token ${token}`);
        // console.log("User ID:", user._id);

        // Set the token as a cookie
        res.cookie('token', token, {
            maxAge: maxAgeInMilliseconds,  // Set cookie expiration time
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout 
router.post('/logout', (req, res) => {
    // Clear the refresh token from the server (if applicable)
    
    // You would typically remove the user's refresh token from the database here
  
    // Clear the access token cookie from the client
    res.clearCookie('token', {
        expires: new Date(Date.now() - 1), // Set cookie to expire immediately
    });
  
    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logged out successfully' });
});

// GET user by ID to retrieve username
router.get('/username',authMiddleware, async (req, res) => {
    try {
  
      // Find the user by ID
      console.log("User ID via Auth Middleware: ",req.userId)
      const user = await UsersSchema.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Extract and send the username
      const { username } = user;
      res.json({ username });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
});

router.get('/status',authMiddleware, async (req, res) => {
    try {
  
      // Find the user by ID
      console.log("User ID via Auth Middleware: ",req.userId)
      const user = await UsersSchema.findById(req.userId);
      if (user){
        res.status(200).json({ msg: "Authorized" });
      }

    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
});

module.exports = router;


