const express = require("express");
const cors = require("cors");

const app = express();

// CORS Configuration - MUST be above all routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auction-mu-rouge.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/items", require("./routes/items.routes"));

module.exports = app;