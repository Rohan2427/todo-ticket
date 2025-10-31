const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://admin:rs@12345@localhost:27017/todo-app?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

// Todo Schema
const Todo = mongoose.model('Todo', { text: String, completed: Boolean });

// API Endpoints
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.listen(3000, () => console.log('Server running on port 3000'));
