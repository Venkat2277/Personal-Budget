const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('mydb');
    const collection = db.collection('test');

    app.get('/', (req, res) => {
      res.send('API is working');
    });

    app.post('/data', async (req, res) => {
      const data = req.body;
      console.log('Received data:', data);
      await collection.insertOne(data);
      res.send('Data inserted');
    });

    app.listen(PORT, () => {
      console.log(`API served at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
