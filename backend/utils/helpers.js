const fs = require('fs')
const puppeteer = require('puppeteer')

/********** Helper function to read files **********/
const readFile = async (URI) => {
  return new Promise(resolve => {
    fs.readFile(URI, 'utf-8', (error, data) => {
      if(error){
        console.log(error)
        return
      }
      resolve(JSON.parse(data))
    })
  })
}

/********** Helper function to write files **********/
const writeFile = async (URI, data) => {

  data = JSON.stringify(data)
  let fileContent = []

  if(fileExistsCheck(URI)){
    fileContent = await readFile(URI)
    fileContent = JSON.stringify(fileContent)
  }

  if(data === fileContent) return

  fs.writeFile(URI, data, (error) => {
    if(error){
      console.log(error)
      return
    }
  })
}

/********** Helper function to scrape web for JSON-data **********/
const fetchJSONData = async (URL) => {
  // Launch puppeteer browser
  const browser = await puppeteer.launch()
  // Open new page
  const page = await browser.newPage()
  // Go to given URL
  await page.goto(URL)
  // Get JSON parsed contents of <body></body>
  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText)
  })
  return data
}

const fileExistsCheck = (URI) => {
  return(fs.existsSync(URI))
}

module.exports = {
  readFile,
  writeFile,
  fetchJSONData,
  fileExistsCheck
}