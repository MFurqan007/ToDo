const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

let TodoSchema = require('../models/todo');

// Get all todos
router.get('/get',authMiddleware, async (req, res) => {
  try {
    const todos = await TodoSchema.find();
    console.log("User ID in Todo: ",req.userId)
    res.send(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/create',authMiddleware, async (req, res) => {
  console.log(req.body)
  const todo = new TodoSchema({
    
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ... Add update and delete routes here ...

module.exports = router;