const express = require('express');
const cors = require('cors');
const path = require('path');
const fs=require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const budgetModel = require("./Model/budgetModel");

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/personal_budget', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Health check route
app.get('/ping', (req, res) => {
  res.send('Pong! Server is alive.');
});

// Root route serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Static budget data

app.post("/api/budget", async (req, res) => {
  try {
      const { title, budget, color } = req.body;
      if (!title || !budget || !color) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const newBudget = new BudgetModel({ title, budget, color });
      await newBudget.save();

      res.status(201).json({ message: "Budget item added", budget: newBudget });
  } catch (err) {
      res.status(500).json({ error: "Failed to add budget item" });
  }
});




  app.get('/api/budget/', async (req, res) => {
  try {
    const budgetdata = await budgetmodel.find();
    res.json( {myBudget: budgetdata});
  } catch (err) {
    res.status(500).json({error: "Falied to fetch data"});
  }
})

// Budget API
app.get('/budget', (req, res) => {
  res.json({ budget: budgetData });
});

// 404 handler for everything else
app.get('*', (req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
