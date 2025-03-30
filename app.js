const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.get("/", (req, res) => {
  res.send("<h1>Hello World!<h1>");
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
