const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB...', err));
