import assert from "assert";
import test from "selenium-webdriver/testing";
import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import chromedriver from "chromedriver";
import chai from "chai";


const By = webdriver.By,
    expect = chai.expect,
    iContrasenia = "123456",
    iNombreUsuario = "admin",
    path = chromedriver.path,
    service = new chrome.ServiceBuilder(path).build(),
    until = webdriver.until,
    urlBase = "http://localhost:3000";

chrome.setDefaultService(service);

let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome()).build();


test.describe("Módulo Login", () => {


    before((done) => {
        driver.manage().window().maximize();
        driver.navigate().to(urlBase)
            .then(() => done());

    });


    test.it("Ingreso de credenciales", () => {

        const menuUsername = "id('titulo-nombre-usuario-menu')",
            sBotonSubmit = "//button[@type='submit']",
            sContrasenia = "id('InptTxtPass')",
            sNombreUsuario = "id('InptTxtUser')";

        driver.wait(until.elementLocated(By.xpath(sNombreUsuario)));
        driver.findElement(By.xpath(sNombreUsuario)).sendKeys(iNombreUsuario);

        driver.wait(until.elementLocated(By.xpath(sContrasenia)));
        driver.findElement(By.xpath(sContrasenia)).sendKeys(iContrasenia);

        driver.wait(until.elementLocated(By.xpath(sBotonSubmit)));
        driver.findElement(By.xpath(sBotonSubmit)).click();

        driver.wait(until.elementLocated(By.xpath(menuUsername)));
        driver.findElement(By.xpath(menuUsername)).getAttribute("innerText")
            .then(text => expect(text).to.equal(iNombreUsuario));

    });

});


test.describe("Módulo Plan táctico Semanal", () => {

    test.it("Iniciando módulo", () => {

        const itemMemu = "//ul[@class='nav collapse']/li[2]",
            menu = "//ul[@class='nav']/li[2]";

        driver.findElement(webdriver.By.xpath(menu)).then(elem => {

            driver.actions().mouseMove(elem).perform();
            driver.sleep(1000);

            driver.wait(until.elementLocated(By.xpath(itemMemu)));
            driver.findElement(By.xpath(itemMemu)).click();

        });

        driver.sleep(3000);

    });

    after(() => driver.quit());

});
