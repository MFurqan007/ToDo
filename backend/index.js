const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ToDo")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name : "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("<h1> To Do List Meet Api </h1>");
});

const todosRouter = require('./controllers/todoRoute');
app.use('/todos', todosRouter);

const usersRouter = require('./controllers/usersRoute');
app.use('/users', usersRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});