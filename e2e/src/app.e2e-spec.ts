import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getLoginText()).toEqual("User Login:");
  });

  it("should login",()=>{
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    var loginInput = element(by.id('login'))
    var loginButton = element(by.id('loginBtn'))
    loginInput.sendKeys("supp")
    loginButton.click();
    browser.driver.sleep(2000);
    expect(page.findId("welcome")).toEqual('Welcome')
  })

  it("should Create server",()=>{

    var input = element(by.id("serverInput"))
    var addButton = element(by.id("addButton"))
    input.sendKeys("TestServer")
    addButton.click();
      var server = element.all(by.className("roomName")).last()
      browser.driver.sleep(100);
      expect(server.getText()).toEqual("TestServer:")
  })
});
