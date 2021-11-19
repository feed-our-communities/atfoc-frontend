const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert');

(async function testValidSignup() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('http://localhost:3000/CreateAccount');

        await driver.findElement(By.id('formCreateAccountUsername')).sendKeys("username", Key.ENTER);
        await driver.findElement(By.id('formCreateAccountFirstName')).sendKeys("first", Key.ENTER);
        await driver.findElement(By.id('formCreateAccountLastName')).sendKeys("last", Key.ENTER);
        await driver.findElement(By.id('formCreateAccountPassword')).sendKeys("password", Key.ENTER);
        await driver.findElement(By.id('formCreateAccountConfirmPassword')).sendKeys("password", Key.ENTER);

        await driver.findElement(By.id('createAccountButton')).click();

        let curUrl = await driver.getCurrentUrl();

        assert.equal(curUrl, "http://localhost:3000/", "Expected url after good login was");

    }
    finally{
        await driver.quit();
    }
})();