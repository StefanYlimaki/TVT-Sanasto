const router = require("express").Router();
const fetchJSONData = require("../utils/helpers");

router.get("/:id", async (req, res) => {
  if (req.params.id === "basic-comp") {
    await fetchJSONData(
      "https://gitlab.com/sanasto/comp-basic/-/raw/main/comp-basic.json"
    ).then((response) => {
      res.send(response);
    });
  } else if (req.params.id === "internet-basic") {
    await fetchJSONData(
      "https://gitlab.com/sanasto/internet-basic/-/raw/main/networks-basic.json"
    ).then((response) => {
      res.send(response);
    });
  } else {
    res.send("malformatted id value in url");
  }
});

router.get("/", async (req, res) => {
  await fetchJSONData(
    "https://gitlab.com/sanasto/index/-/raw/main/index.json"
  ).then((response) => {
    res.send(response);
  });
});

module.exports = router;
