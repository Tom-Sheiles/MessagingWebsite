import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { UserInformationService } from '../services/user-information.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = "name";
  groups = [];
  nRooms = 0;
  userLevel = 0;
  userData: object;

  constructor(private router: Router, private activeRoute: ActivatedRoute,private socketService: SocketService, private userInfo: UserInformationService) { }

  ngOnInit() {

    this.name = this.activeRoute.snapshot.params.userName;
    this.userData = this.userInfo.getData();
    if(this.userData == undefined)
      this.router.navigateByUrl('/');
    console.log(this.userData);

    if(this.userData != undefined)
      this.userLevel = this.userData['userLevel'];

    this.socketService.initSocket();
    this.socketService.getRooms();

    this.socketService.roomList((rooms=>{
      rooms = JSON.parse(rooms);
      this.groups = [];
      
      for(let i = 0; i < rooms.length; i++){ //For all groups
        console.log(rooms[i].users);
        let isInRoom = false;

        for(let j = i; j < rooms[i].users.length; j++){ //For all rooms
          if(this.name == rooms[i].users[j] || this.userLevel > 2)
            isInRoom = true;
        }

        if(isInRoom){
          this.groups.push(rooms[i]);
          this.nRooms += 1;
        }
      }

    }));
  }

  JoinRoom(group, room){
    console.log(group, room);
  }

}
