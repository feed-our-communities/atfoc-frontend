const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert');

(async function testGoodUsernameAndPassword() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('http://localhost:3000/login');

        let username = "test@domain.com";
        let password = "testPassword";

        await driver.findElement(By.id('formLoginUsername')).sendKeys(username, Key.ENTER);
        await driver.findElement(By.id('formLoginPassword')).sendKeys(password, Key.ENTER);

        await driver.findElement(By.id('loginButton')).click();

        let curUrl = await driver.getCurrentUrl();

        assert.equal(curUrl, "http://localhost:3000/", "Expected url after good login was");

    }
    finally{
        await driver.quit();
    }
})();