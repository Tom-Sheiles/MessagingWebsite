import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";

  constructor(private router: Router, private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onClick(){

    let userData = {"userName":this.userName};

    this.httpClient.post(BACKEND_URL + '/auth', userData)
    .subscribe((data: any)=>{

      if(data.res == "valid"){

        this.router.navigateByUrl('/dashboard')
     }

    });
    
    this.userName = "";
  }

}
