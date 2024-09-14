const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

let groceryList = []; // In-memory grocery list
let storeInstructions = "No instructions available yet"; // Default instructions

// Get grocery list (GET /api/grocery-list)
app.get("/api/grocery-list", (req, res) => {
  res.json({ groceryList });
});

// Add grocery item (POST /api/grocery-list)
app.post("/api/grocery-list", (req, res) => {
  const { item } = req.body;
  if (item) {
    groceryList.push(item);
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Item is required" });
  }
});

// Get store instructions (GET /api/instructions)
app.get("/api/instructions", (req, res) => {
  res.json({ instructions: storeInstructions });
});

// Update store instructions (POST /api/instructions)
app.post("/api/instructions", (req, res) => {
  const { instructions } = req.body;
  if (instructions) {
    storeInstructions = instructions;
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Instructions required" });
  }
});

// Server-Sent Events for real-time instruction updates
app.get("/api/listen-instructions", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    res.write(`data: ${storeInstructions}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
