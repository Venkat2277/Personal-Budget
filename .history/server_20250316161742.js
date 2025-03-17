const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Budget = require('./Model/budgetModel');
const port = 3000;

app.use(express.json()); // to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB...', err));


// Get all budget items
app.get('/api/budget', async (req, res) => {
  try {
    const budgetItems = await Budget.find();
    res.json(budgetItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Add a new budget item
app.post('/api/budget', async (req, res) => {
  const { title, value, color } = req.body;

  const budgetItem = new Budget({
    title,
    value,
    color
  });

  try {
    const newBudget = await budgetItem.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/budget", (req,res)=>{
  res.json(budgetItems);
})

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
})
