const mongoose = require('mongoose');

// Define the users schema
const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Create the users model
const Users = mongoose.model('Users', usersSchema);

// Export the users model
module.exports = Users;