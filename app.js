const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");

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
app.post("/signup", createUser);
app.post("/signin", login);
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
