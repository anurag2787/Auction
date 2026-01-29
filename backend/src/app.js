const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/items", require("./routes/items.routes"));

module.exports = app;