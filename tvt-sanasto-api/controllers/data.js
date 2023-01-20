const router = require("express").Router();
const Dictionary = require("../models/dictionary");
const fetchJSONData = require("../utils/helpers");

router.get("/:id", async (req, res) => {
  if (req.params.id === "basic-comp") {
    Dictionary.find({ name: "comp-basic" })
      .then((dictionary) => {
        res.json(dictionary);
      })
      .catch((error) => console.log(error));
  } else if (req.params.id === "internet-basic") {
    Dictionary.find({ name: "networks-basic" })
      .then((dictionary) => {
        res.json(dictionary);
      })
      .catch((error) => console.log(error));
  } else {
    res.send("malformatted id value in url");
  }
});

router.get("/", async (req, res) => {
  await fetchJSONData("https://gitlab.com/sanasto/index/-/raw/main/index.json")
    .then((response) => {
      res.send(response);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
