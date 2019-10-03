import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getLoginText()).toEqual("User Login:");
  });

  it("Should fail to login",()=>{
      browser.waitForAngularEnabled(false);
      var loginInput = element(by.id('login'))
      var loginButton = element(by.id('loginBtn'))
      loginInput.sendKeys("user2")
      loginButton.click();
      browser.driver.sleep(200);

      var alertText = browser.driver.switchTo().alert().getText();
      expect(alertText).toEqual("Password Incorrect")
      browser.driver.switchTo().alert().accept();
  })

  it("Should enter non existant account",()=>{
    browser.waitForAngularEnabled(false);
    var loginInput = element(by.id('login'))
    var loginButton = element(by.id('loginBtn'))
    loginInput.sendKeys("account1")
    loginButton.click();
    browser.driver.sleep(200);

    var alertText = browser.driver.switchTo().alert().getText();
    expect(alertText).toEqual("Account not found")
    browser.driver.switchTo().alert().accept();
})

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

  it("Should Create a new channel",()=>{
    var input = element.all(by.className("roomInput")).last()
    var addButton = element.all(by.className("addRoomButton")).last()
    input.sendKeys("TestRoom");
    addButton.click();
    var room = element.all(by.className("roomButton")).last();
    browser.driver.sleep(100);
    expect(room.getText()).toEqual("TestRoom");
  })

  it("Should Post into channel",()=>{
    var addButton = element.all(by.className("roomButton")).last();
    addButton.click();
    var messageInput = element(by.id("messageInput"))
    messageInput.sendKeys("Test Message")
    var sendButton = element(by.id("sendButton"))
    sendButton.click();

    var messageName = element(by.id("messageName"));
    var messageContent = element(by.id("messageContent"))
    expect(messageName.getText()).toEqual("supp:");
    expect(messageContent.getText()).toEqual("Test Message")
  })

  it("should logout user",()=>{
    var logout = element(by.id("logoutButton"));
    logout.click();
    var loginText = element(by.id("loginText"));
    browser.driver.sleep(100);
    expect(loginText.getText()).toEqual("User Login:")
  })
});
