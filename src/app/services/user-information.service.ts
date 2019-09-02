import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// User information service is responsible for maintaing persistence for user accounts accross pages and page reloads
export class UserInformationService {

  currentUser: object;

  constructor() { }

  // Set and get functions are responsible for modifying and retrieving user information
  setUser(userData){
    this.currentUser = userData;
  }
  getData(){
    return this.currentUser;
  }

  // Save stores the user information in local client storage to maintain persistence after reload
  saveUsername(){
    localStorage.setItem('userData',JSON.stringify(this.currentUser));
  }

  // Get function retrieves the user information from local client storage and sets the current user to that value
  getUsername(){

    this.currentUser = JSON.parse(localStorage.getItem('userData'));
    if(this.currentUser != null)
      return this.currentUser['userName'];
    else
      return "";
  }

  // Function clears the validation of the current user from local storage
  Logout(){
    localStorage.removeItem('userData');
  }
}
