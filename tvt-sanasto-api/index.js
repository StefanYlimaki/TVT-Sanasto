const express = require("express");
const cors = require("cors");
const dataRouter = require('./controllers/data')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/data', dataRouter)

app.get("/", (req, res) => {
  res.send(
    "<div><h2>TVT-Sanasto API</h2><p>Used to fetch dictionaries</p<</div>");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(5000, () => {
  console.log("running on port 5000");
});

module.exports = app;