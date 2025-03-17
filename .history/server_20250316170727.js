const express = require('express');
const cors = require('cors');
const path = require('path');
const fs=require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const budgetmodel = require('./Model/budgetModel');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Health check route
app.get('/ping', (req, res) => {
  res.send('Pong! Server is alive.');
});

// Root route serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Static budget data
const budgetData = [
  { category: 'Rent', amount: 1000 },
  { category: 'Groceries', amount: 300 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Utilities', amount: 200 },
  { category: 'Savings', amount: 500 },
  { category: 'Insurance', amount: 100 }
];

app.post('/api/budget/', async (req, res) => {
  try {
    const { title, value, color} = req.body;
    if (!title || !value || !color) {
      return res.status(400).json({error: "Please provide title, value and color"});
    }
    const newBudget = new budgetModel({title, value, color});
    await newBudget.save();

    res.status(201).json({message: "Budget created successfully", budget: newBudget});
  } catch (err) {
    res.status(500).json({error: "Failed to create budget"});
  
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
