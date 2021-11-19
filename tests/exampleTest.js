const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('http://localhost:3000/');

        let curUrl = await driver.getCurrentUrl();

        assert.equal(curUrl, "http://localhost:3000/login", "Expected url without token was");
    }
    finally{
        await driver.quit();
    }
})();
