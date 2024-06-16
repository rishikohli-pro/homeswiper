const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

// Set up Puppeteer
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the target URL
  await page.goto('https://www2.hm.com/en_in/women/products/tops');

  // Wait for the page to load
  await page.waitForSelector('div.product-item');

  // Get the HTML content
  const html = await page.content();

  // Parse the HTML using Cheerio
  const $ = cheerio.load(html);

  // Extract product data
  const products = [];
  $('div.product-item').each((index, element) => {
    const product = {
      title: $(element).find('h2.product-name').text(),
      image: $(element).find('img.product-image').attr('src'),
      price: $(element).find('span.price').text(),
    };
    products.push(product);
  });

  // Log the extracted data
  console.log(products);

  // Close the browser
  await browser.close();
})();