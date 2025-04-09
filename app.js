const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const helmet = require("helmet");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the db");
  })
  .catch(console.error);

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "67e9c2728d3662fa66b82748",
  };
  next();
});
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
