import express from 'express';
import cors from 'cors'; // Import the CORS package
import { handler } from '../client/build/handler.js';

const app = express();

// Enable CORS for all origins
app.use(cors());

// Use SvelteKit handler for everything else
app.use(handler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
