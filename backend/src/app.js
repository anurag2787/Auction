const express = require("express");
const cors = require("cors");

const app = express();

// CORS Configuration - Allow all origins
app.use(cors());

app.use(express.json());

// Routes
app.use("/items", require("./routes/items.routes"));

module.exports = app;