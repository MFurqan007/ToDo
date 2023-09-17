const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  todos: [
    {
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
    }
  ]
});

const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;