const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const dataRouter = require("./controllers/data");

app.use(express.json());
app.use(cors());
app.use("/api/data", dataRouter);

app.get("/", (req, res) => {
  res.send(
    "<div><h2>TVT-Sanasto API</h2><p>Used to fetch dictionaries</p<</div>"
  );
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

module.exports = app;
