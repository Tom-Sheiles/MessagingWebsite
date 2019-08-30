import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = "name";
  groups = [];

  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.initSocket();
    this.socketService.getRooms();
    this.socketService.roomList((msg=>{this.groups = JSON.parse(msg); console.log(this.groups)}));
  }

}
