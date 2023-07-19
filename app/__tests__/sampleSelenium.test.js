/*
//set up require statements taken from selenium-lab-example
const { describe, it, expect, afterAll } = require('@jest/globals')
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const service = new chrome.ServiceBuilder;
const driver =  new Builder().forBrowser('chrome').setChromeService(service).build();
let started = false

describe("login input tests", () => {
    //ensure driver is running
    it('should wait fo the driver to start', () =>{
        return driver.then(() => {started = true})
    })

    it('should have a title of OutdoorNow', async () => {
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get title
        const title = await driver.getTitle();
        //assert title is OutdoorNow 
        expect(title).toMatch('OutdoorNow');
    })

    it("should allow users to input info into the username field", async () => {
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testUsername');
        //get element again to access sent value
        const input2 = await driver.findElement(By.id("username"));
        //turn to string to avoid type errors
        const val = String(await input2.getAttribute("value"));
        //assert value to contain sent value
        expect(val).toMatch('testUsername');
    })

    it("should allow users to input info into the password field", async () => {
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("password"));
        //send value to field
        input.sendKeys('testPassword.123');
        //get element again to access sent value
        const input2 = await driver.findElement(By.id("password"));
        //turn to string to avoid type errors
        const val = String(await input2.getAttribute("value"));
        //assert value to contain sent value
        expect(val).toMatch('testPassword.123');
    })

    afterAll(async () => {
        await driver.quit()
    });

});
*/