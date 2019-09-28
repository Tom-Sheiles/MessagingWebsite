import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInformationService } from '../services/user-information.service';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";

  constructor(private router: Router, private httpClient:HttpClient, private userInfo: UserInformationService) { }

  ngOnInit() {

    this.userName = this.userInfo.getUsername();
    if(this.userName != "")
      this.router.navigateByUrl('/dashboard/' + this.userName);
  }

  // On click is called by the login buttons event listener and sends a validation request to the node server
  onClick(){

    let userData = {"userName":this.userName,"password":this.password};

    this.httpClient.post(BACKEND_URL + '/auth', userData)
    .subscribe((data: any)=>{
      console.log(data)
      
      if(data.res == "valid"){
        this.userInfo.setUser(data);
        this.userInfo.saveUsername();
        this.router.navigateByUrl('/dashboard/' + this.userName);
     }else if (data.res == "invalid"){
       alert("Account not found");
       
     }else{
       alert("Password Incorrect");
     }
      this.userName = "";
      this.password = ""

    });
    
    
  }

}
