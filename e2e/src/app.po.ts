import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  clickButton(btn){
    btn.click();
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
  getLoginText(){
    return element(by.css("h3")).getText() as Promise<string>;
  }

  findId(id){
    return element(by.id(id)).getText() as Promise<string>;
  }

  findText(text){
    return element(by.cssContainingText('.roomName','Test Server'))
  }
}
