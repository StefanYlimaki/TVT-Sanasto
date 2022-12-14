const router = require('express').Router()

const { refreshExtractor } = require('../utils/middleware')
const { fileExistsCheck, readFile, writeFile, fetchJSONData } = require('../utils/helpers')


/********** Router for getting the index of dictianaries **********/
router.get('/', refreshExtractor, async (req, res) => {
  if(req.refresh === false && fileExistsCheck('C:/Users/nikol/projects/tvt-sanasto/backend/data/index.json')){
    const response = await readFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/index.json')
    res.json(response)
  } else {
    // Call web-scraper function to fetch the JSON-data, and store response to a variable
    const data = await fetchJSONData('https://gitlab.com/sanasto/index/-/raw/main/index.json')
    // Write a file for the set category with the content of previously fetched JSON-data
    writeFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/index.json', data)
    // Lastly send response with JSON-data fetched
    res.json(data)
  }
})

/********** Router for getting dictionaries of spesified id **********/
router.get('/:id/', refreshExtractor, async (req, res) => {
  // Initializing array which is to be filled with words of category spesified with id
  let dataToSend = []

  /********** Handling requests with id 'basic-comp' **********/
  if (req.params.id && req.params.id === 'basic-comp') {
    // If refresh option is false AND the file of set category exists
    if(req.refresh === false && fileExistsCheck('C:/Users/nikol/projects/tvt-sanasto/backend/data/basic-comp.json')){
      // Read contents of that file
      const response = await readFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/basic-comp.json')
      // And send response with JSON-data found inside of it
      res.json(response)
    // Otherwise, if refresh option is set to true or file of set category doesn't exist
    } else {
      // Call web-scraper function to fetch the JSON-data, and store response to a variable
      dataToSend = await fetchJSONData(
        'https://gitlab.com/sanasto/comp-basic/-/raw/main/comp-basic.json'
      )
      // Write a file for the set category with the content of previously fetched JSON-data
      writeFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/basic-comp.json', dataToSend)
      // Lastly send response with JSON-data fetched
      res.json(dataToSend)
    }

  /********** Handling requests with id 'internet-basic' **********/
  } else if (req.params.id === 'internet-basic') {
    // If refresh option is false AND the file of set category exists
    if(req.refresh === false && fileExistsCheck('C:/Users/nikol/projects/tvt-sanasto/backend/data/networks-basic.json')){
      // Read contents of that file
      const response = await readFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/networks-basic.json')
      // And send response with JSON-data found inside of it
      res.json(response)
    // Otherwise, if refresh option is set to true or file of set category doesn't exist
    } else {
      // Call web-scraper function to fetch the JSON-data, and store response to a variable
      dataToSend = await fetchJSONData(
        'https://gitlab.com/sanasto/internet-basic/-/raw/main/networks-basic.json'
      )
      // Write a file for the set category with the content of previously fetched JSON-data
      writeFile('C:/Users/nikol/projects/tvt-sanasto/backend/data/networks-basic.json', dataToSend)
      // Lastly send response with JSON-data fetched
      res.json(dataToSend)
    }
  } else {
    res.send(
      '<div>' +
        '<p>Oops, something went wrong. The resource you were looking for was not found</p>' +
        '<p> We think that the resource id was formatted incorrectly</p>' +
      '</div>'
    )
  }
})

module.exports = router
