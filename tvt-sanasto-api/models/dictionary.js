const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

const dictionarySchema = new mongoose.Schema({
  name: String,
  words: [Object],
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection was succesful");
  })
  .catch((err) => console.log(err));

module.exports = mongoose.model("Dictionary", dictionarySchema);
