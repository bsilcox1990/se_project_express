const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the db");
  })
  .catch(console.error);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
