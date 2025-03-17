// Import dependencies
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Create an express app
const app = express();
const PORT = 3000;

// Enable CORS for frontend requests (important if running on different ports)
app.use(cors());

// MongoDB connection URI and client setup
const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI);

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Select the database and collection
    const db = client.db('personalBudget');
    const collection = db.collection('budget');

    // Define a simple API route
    app.get('/', (req, res) => {
      res.send('🎉 API is working!');
    });

    // Define the /budget route (this serves the data for your frontend)
    app.get('/budget', async (req, res) => {
      try {
        // Fetch all budget data
        const budgetData = await collection.find({}).toArray();

        // Send it back as JSON in the expected format
        res.json({
          budget: budgetData
        });
      } catch (err) {
        console.error(' Error fetching budget data:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`API served at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(' Error starting server:', err);
  }
}

// Call the function to start everything
startServer();
