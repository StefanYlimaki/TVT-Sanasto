const router = require("express").Router();
const fetchJSONData = require("../utils/helpers");
const fs = require("fs");
const path = require('path');
const { readFileSync } = require('fs');

const handleRefetch = async (url, category) => {
  await fetchJSONData(url).then((response) => {
    const dictionaryDataFile = path.join(process.cwd(), 'data', `${category}.json`);
    fs.writeFileSync(dictionaryDataFile, JSON.stringify(response))

    const dataLogsFile = path.join(process.cwd(), 'data', 'dataLogs.json');
    const stringifiedFile = readFileSync(dataLogsFile, 'utf8');
    const JSONArray = JSON.parse(stringifiedFile);
    const updatedJSONArray = JSONArray

    for (let i = 0; i < JSONArray.length; i++) {
      if (JSONArray[i].name === category) {
        const now = new Date().getTime();
        updatedJSONArray[i].updatedAt = now;
        break;
      }
    }

    fs.writeFileSync(dataLogsFile, JSON.stringify(updatedJSONArray))
  })
}

const handleRequest = (category, req, res) => {
  const dataLogsFile = path.join(process.cwd(), 'data', 'dataLogs.json');
  const stringifiedFile = readFileSync(dataLogsFile, 'utf8');
  const JSONArray = JSON.parse(stringifiedFile);

  for (let i = 0; i < JSONArray.length; i++) {
    if (JSONArray[i].name === category) {
      const now = new Date().getTime();
      const updatedAt = JSONArray[i].updatedAt;
      if (now - updatedAt > 172800000) {
        if(category === "comp-basic"){
          handleRefetch("https://gitlab.com/sanasto/comp-basic/-/raw/main/comp-basic.json", category)
        } else if (category === "internet-basic"){
          handleRefetch("https://gitlab.com/sanasto/internet-basic/-/raw/main/networks-basic.json", category)
        }
      }
    }
  }

  const dictionaryDataFile = path.join(process.cwd(), 'data', `${category}.json`);
  const stringified = readFileSync(dictionaryDataFile, 'utf8');
  res.setHeader('Content-Type', 'application/json');
  return res.end(stringified);
}

router.get("/:id", async (req, res) => {
  if (req.params.id === "comp-basic") {
    handleRequest('comp-basic', req, res)
  } else if (req.params.id === "internet-basic") {
    handleRequest('internet-basic', req, res)
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