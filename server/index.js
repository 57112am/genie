const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Navigating to the page...");
    await page.goto('http://tapi.merai.cloud:8000/#form', { waitUntil: 'networkidle2' });

    console.log("Entering query...");
    await page.type('#task', query);

    console.log("Submitting form...");
    await page.click('input[type="submit"]');

    console.log("Waiting for report container...");
    await page.waitForSelector('#reportContainer', { timeout: 30000 });

    const report = await page.$eval('#reportContainer', (el) => el.innerText.trim());

    if (!report) {
      throw new Error("No report content found.");
    }

    await browser.close();
    res.json({ report });

  } catch (error) {
    console.error("Error scraping data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
