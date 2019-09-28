import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { UserInformationService } from '../services/user-information.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

import * as $ from 'jquery';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

// The dashboard page is responsible for displaying the group and room infromation for each user
export class DashboardComponent implements OnInit {

  name = "name";
  groups = [];
  nRooms = 0;
  userLevel = 0;
  userData: object;
  closeResult: string;
  inputField: string = '';
  groupInputField: string = '';
  removeUserDisplay = 'none';
  addUserDisplay = 'none';


  constructor(private router: Router, private activeRoute: ActivatedRoute,private socketService: SocketService, private userInfo: UserInformationService,
    private ngbmodal: NgbModal) { }

  
  // On init is called each time the page is loaded and retrieves the necessary information from the server
  ngOnInit() {

    this.name = this.activeRoute.snapshot.params.userName;
    this.userData = this.userInfo.getData();
    if(this.userData == undefined)
      this.router.navigateByUrl('/');

    if(this.userData != undefined)
      this.userLevel = this.userData['userLevel'];

    this.socketService.initSocket();
    this.socketService.getRooms();

    this.socketService.roomList((rooms=>{
      console.log(rooms);
      rooms = JSON.parse(rooms);
      this.groups = [];
      
      let isInRoom = false;
      let i = 0;
      
      for(i; i < rooms.length; i++){ //For all groups
        for(let j = 0; j < rooms[i].users.length; j++){ //For all users
          if(this.name == rooms[i].users[j] || this.userLevel > 3)
            isInRoom = true;
        }
      
        if(isInRoom){
          //console.log("Pushed room: ", rooms[i]);
          this.groups.push(rooms[i]);
          this.nRooms += 1;
        }
      }
    }));

  }

  JoinRoom(group, room){
    console.log(group, room);
  }

  // Add and remove functions called as button event listeners by the pages html
  Logout(){
    this.userInfo.Logout();
    this.router.navigateByUrl('/');
  }

  addUser(group){
    this.socketService.addUser(group, this.inputField);
    this.inputField = '';
    this.socketService.getRooms();
  }

  removeUser(group){
    this.socketService.removeUser(group, this.inputField);
    this.inputField = '';
    this.socketService.getRooms();
  }

  addChannel(group){
    this.socketService.addChannel(group, this.inputField);
    this.inputField = '';
    this.socketService.getRooms();
  }

  removeChannel(group){
    this.socketService.removeChannel(group, this.inputField);
    this.inputField = '';
    this.socketService.getRooms();
  }

  addGroup(){
    console.log(this.groupInputField)
    this.socketService.addGroup(this.groupInputField, this.name)
    this.groupInputField = '';
  }

  removeGroup(){
    console.log(this.groupInputField)
    this.socketService.removeGroup(this.groupInputField)
    this.groupInputField = '';
  }

  promoteUser(level){
    this.socketService.promoteUser(this.groupInputField, level)
    this.groupInputField = '';
  }
 
}
