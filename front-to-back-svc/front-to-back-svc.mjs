// Import the express and axios modules
import express from 'express';
import { get } from 'axios';

// Create a new express application
const app = express();

// Define the /api/random-word/get endpoint
app.get('/api/random-word/get', async (req, res) => {
  try {
    const response = await get('http://random-words-svc');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error getting random word' });
  }
});

// Define the /api/random-image/get endpoint
app.get('/api/random-image/get', async (req, res) => {
  try {
    let word = req.query.word;
    if (!word) {
      const response = await get('http://localhost:3000/api/random-word/get');
      word = response.data;
    }
    const response = await get(`http://image-service/${word}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error getting random image' });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});