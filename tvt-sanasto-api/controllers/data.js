const router = require("express").Router();
const fetchJSONData = require("../utils/helpers");
const fs = require("fs");

const handleFecthJSONDataCall = async (url, category) => {
  await fetchJSONData(url).then((response) => {
    fs.writeFileSync(`./data/${category}.json`, JSON.stringify(response))

    fs.readFile("./data/updatedAt.json", function (err, data) {
      if (err) {
        return console.error(err);
      }

      const JSONArray = JSON.parse(data.toString());
      let updatedUpdatedAt = JSONArray 

      for (let i = 0; i < JSONArray.length; i++) {
        if (JSONArray[i].name === category) {
          const now = new Date().getTime();
          updatedUpdatedAt[i].updatedAt = now;
          break;
        }
      }
      fs.writeFileSync(`./data/updatedAt.json`, JSON.stringify(updatedUpdatedAt))
    })
  })
}

const handleRefetch = (category) => {
  if(category === "comp-basic"){
    handleFecthJSONDataCall("https://gitlab.com/sanasto/comp-basic/-/raw/main/comp-basic.json", category)
  } else if (category === "networks-basic"){
    handleFecthJSONDataCall("https://gitlab.com/sanasto/internet-basic/-/raw/main/networks-basic.json", category)
  }
}

const handleRequest = (category, req, res) => {
  fs.readFile("./data/updatedAt.json", function (err, data) {
    if (err) {
      return console.error(err);
    }

    const JSONArray = JSON.parse(data.toString());
    let refetchData = false;

    for (let i = 0; i < JSONArray.length; i++) {
      if (JSONArray[i].name === category) {
        const now = new Date().getTime();
        const updatedAt = JSONArray[i].updatedAt;
        if (now - updatedAt > 172800000) {
          refetchData = true;
        }
      }
    }
    
    if (refetchData) {
      console.log("initiated refetch on", category);
      handleRefetch(category)
    }

    fs.readFile(`./data/${category}.json`, function (err, data) {
      if (err) {
        return console.error(err);
      }
      const JSONData = JSON.parse(data.toString());
      res.send(JSONData);
    });

  });
}

router.get("/:id", async (req, res) => {
  if (req.params.id === "basic-comp") {
    handleRequest('comp-basic', req, res)
  } else if (req.params.id === "internet-basic") {
    handleRequest('networks-basic', req, res)
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