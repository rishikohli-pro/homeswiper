// scrape.js

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to scrape H&M India skirts page
async function scrapeHnmIndiaSkirts(url) {
    // Configure Chrome options
    let options = new chrome.Options();
    options.addArguments('--headless'); // Comment out to see browser interaction

    // Start the Selenium WebDriver
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the provided URL
        await driver.get(http://www2.hm.com/en_in/women/shop-by-product/skirts.html);

        // Example: Scraping data from the page
        let pageTitle = await driver.getTitle();
        console.log('Page Title:', pageTitle);

        // Example: Scraping product URLs from the page
        let productUrls = await scrapeProductUrls(driver);
        console.log('Product URLs:', productUrls);

        // Example: Scraping product details from each product page
        let productsData = await scrapeProductDetails(driver, productUrls);
        console.log('Products Data:', productsData);

        // Example: Saving scraped data to a file (e.g., JSON)
        let dataToSave = {
            title: pageTitle,
            products: productsData
        };
        saveScrapedData(dataToSave);

        return dataToSave;

    } finally {
        await driver.quit(); // Ensure WebDriver is closed after scraping
    }
}

// Function to scrape product URLs from the page
async function scrapeProductUrls(driver) {
    let productUrls = [];
    try {
        // Example: Scraping product URLs from the page
        let productElements = await driver.findElements(By.className('item-link'));
        for (let product of productElements) {
            let url = await product.getAttribute('href');
            if (url && url.startsWith('http')) {
                productUrls.push(url);
            }
        }
    } catch (error) {
        console.error('Error scraping product URLs:', error);
    }
    return productUrls;
}

// Function to scrape product details from each product page
async function scrapeProductDetails(driver, productUrls) {
    let productsData = [];
    try {
        for (let url of productUrls) {
            await driver.get(url);

            // Example: Scraping product details
            let productData = {
                name: await driver.findElement(By.className('product-title')).getText(),
                price: await driver.findElement(By.className('product-price')).getText(),
                description: await driver.findElement(By.className('product-description')).getText(),
                imageUrl: await scrapeProductImage(driver)
                // Add more fields as needed
            };

            productsData.push(productData);
        }
    } catch (error) {
        console.error('Error scraping product details:', error);
    }
    return productsData;
}

// Function to scrape product image URL
async function scrapeProductImage(driver) {
    try {
        // Example: Scraping product image URL
        let imageUrl = await driver.findElement(By.className('product-detail-main-image')).getAttribute('src');
        return imageUrl;
    } catch (error) {
        console.error('Error scraping product image:', error);
        return null;
    }
}

// Function to save scraped data to a file
function saveScrapedData(data) {
    let outputPath = path.join(__dirname, 'scraped-data.json');
    try {
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log('Scraped data saved to:', outputPath);
    } catch (error) {
        console.error('Error saving scraped data:', error);
    }
}

module.exports = { scrapeHnmIndiaSkirts };
