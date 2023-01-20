const router = require("express").Router();
const Dictionary = require("../models/dictionary");
const fetchJSONData = require("../utils/helpers");

router.get("/:id", async (req, res) => {
  if (req.params.id === "basic-comp") {
    Dictionary.find({ name: "comp-basic" })
      .then((comp_basic) => {
        res.json(comp_basic[0].words);
      })
      .catch((error) => console.log(error));
  } else if (req.params.id === "internet-basic") {
    Dictionary.find({ name: "networks-basic" })
      .then((networks_basic) => {
        res.json(networks_basic[0].words);
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
