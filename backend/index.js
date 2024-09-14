// index.js
import express from 'express';
import { handler } from '../client/build/handler.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

let text = 'Default text';
let groceries = ['Apples', 'Bananas', 'Carrots'];

// POST endpoint to update text and grocery list
app.post('/update', (req, res) => {
  const { newText, newGroceries } = req.body;

  if (newText) text = newText;
  if (Array.isArray(newGroceries)) groceries = newGroceries;

  return res.json({ message: 'Updated successfully' });
});

// API endpoint to fetch updated data
app.get('/api/groceries', (req, res) => {
  return res.json({ groceries, text });
});

// Keep this handler middleware at the end
// Use SvelteKit handler for everything else
app.use(handler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
