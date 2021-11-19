const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert');

(async function testBadUsernameAndPassword() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('http://localhost:3000/login');

        await driver.findElement(By.id('formLoginUsername')).sendKeys('FakeLogin', Key.ENTER);
        await driver.findElement(By.id('formLoginPassword')).sendKeys('FakePassword', Key.ENTER);

        let curUrl = await driver.getCurrentUrl();

        assert.equal(curUrl, "http://localhost:3000/login", "Expected url after bad login was");


    }
    finally{
        await driver.quit();
    }
})();