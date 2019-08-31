import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  currentUser: object;

  constructor() { }

  setUser(userData){
    this.currentUser = userData;
  }

  getData(){
    return this.currentUser;
  }

  saveUsername(){
    localStorage.setItem('userData',JSON.stringify(this.currentUser));
  }

  getUsername(){

    this.currentUser = JSON.parse(localStorage.getItem('userData'));
    if(this.currentUser != null)
      return this.currentUser['userName'];
    else
      return "";
  }

  Logout(){
    localStorage.removeItem('userData');
  }
}
