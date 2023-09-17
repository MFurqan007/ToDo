const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

let TodoSchema = require('../models/todo');

// Get all todos
// router.get('/get',authMiddleware, async (req, res) => {
//   try {
//     const todos = await TodoSchema.find();
//     console.log("User ID in Todo: ",req.userId)
//     res.send(todos);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Create a new todo
// router.post('/create',authMiddleware, async (req, res) => {
//   console.log(req.body)
//   const todo = new TodoSchema({
    
//     title: req.body.title,
//     description: req.body.description,
//   });

//   try {
//     const newTodo = await todo.save();
//     res.status(201).json(newTodo);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// ... Add update and delete routes here ...

// Create a new todo item
router.post('/create',authMiddleware, async (req, res) => {
  try {
    const user = req.userId;
    const { title, description, completed } = req.body;
    
    const newTodo = {
      title,
      description,
      completed,
    };

    const todo = await TodoSchema.findOneAndUpdate(
      { user }, // Find the user's todo list based on their user ID
      { $push: { todos: newTodo } }, // Add the new todo item to the 'todos' array
      { new: true } // Return the updated user with the new todo item
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all todos for a specific user
router.get('/get',authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const userTodos = await TodoSchema.findOne({ user: userId });
    res.json(userTodos.todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific todo item
router.post('/update/:todoId',authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.todoId;
    const { title, description, completed } = req.body;
    
    const updatedTodo = await TodoSchema.findOneAndUpdate(
      { user: userId, 'todos._id': todoId }, // Find the user and the specific todo item by its ID
      {
        $set: {
          'todos.$.title': title,
          'todos.$.description': description,
          'todos.$.completed': completed,
        },
      },
      { new: true } // Return the updated user with the modified todo item
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update completeness of a specific todo item
router.post('/update-completeness/:todoId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.todoId;
    const { completed } = req.body; // Only update the 'completed' field

    // Find the user and the specific todo item by their IDs
    const updatedTodo = await TodoSchema.findOneAndUpdate(
      { user: userId, 'todos._id': todoId },
      {
        $set: {
          'todos.$.completed': completed, // Update the 'completed' field
        },
      },
      { new: true } // Return the updated user with the modified todo item
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific todo item
router.delete('/delete/:todoId',authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.todoId;

    const updatedTodo = await TodoSchema.findOneAndUpdate(
      { user: userId },
      { $pull: { todos: { _id: todoId } } }, // Remove the todo item from the 'todos' array
      { new: true }
    );
    res.json(updatedTodo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;