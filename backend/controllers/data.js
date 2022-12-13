const router = require('express').Router()
const puppeteer = require('puppeteer')

router.get('/', async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://gitlab.com/sanasto/index/-/raw/main/index.json')
  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText)
  })
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  if(req.params.id && req.params.id === 'comp-basic'){
    await page.goto('https://gitlab.com/sanasto/comp-basic/-/raw/main/comp-basic.json')
  } else if (req.params.id === 'networks-basic'){
    await page.goto('https://gitlab.com/sanasto/internet-basic/-/raw/main/networks-basic.json')
  }
  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText)
  })
  res.json(data)
})

module.exports = router