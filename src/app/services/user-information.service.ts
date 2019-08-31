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
}
