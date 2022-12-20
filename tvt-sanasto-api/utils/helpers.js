const edgeChromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const LOCAL_CHROME_EXECUTABLE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const fetchJSONData = async (URL) => {
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(URL);

  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });

  return data;
};

module.exports = fetchJSONData;