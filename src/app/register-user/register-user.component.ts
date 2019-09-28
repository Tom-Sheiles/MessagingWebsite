import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  register(){
    
    let user = {"userName":this.username, "password":this.password, "email":this.email};
    this.http.post(BACKEND_URL + "/register", user).subscribe((data)=>{
      console.log(data);
      this.username = ""; this.email = ""; this.password = "";
    })
    
  }
  cancel(){
    this.router.navigateByUrl("/");
    
  }

}
