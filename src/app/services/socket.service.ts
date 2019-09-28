import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { nextTick } from 'q';
const SERVER_URL = 'http://localhost:3000/messaging'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  // Each function in the socket service is resposible for communication between
  // the Angular front end and the server side to save and retrieve data relating
  // to both users and groups.

  initSocket():void{
    this.socket = io(SERVER_URL);
  }

  getRooms(){
    this.socket.emit("getRooms", "message")
  }

  roomList(rooms){
    this.socket.on("roomList", res=>rooms(res));
  }

  getMesssageHistory(group, room){
    this.socket.emit('messageHistory',group, room);
  }

  messageList(messages){
    this.socket.on("messageList",res=>messages(res))
  }

  sendMessage(messageObject, group, room, callback){
    this.socket.emit("sendMessage",JSON.stringify(messageObject), group, room);
  }

  addUser(group, name): void{
    this.socket.emit("addUser",group, name);
  }

  removeUser(group, name): void{
    this.socket.emit('removeUser', group, name);
  }

  addChannel(group, name): void{
    this.socket.emit('addChannel', group, name);
  }

  removeChannel(group, name): void{
    this.socket.emit('removeChannel', group, name);
  }

  addGroup(name, user):void{
    this.socket.emit('addGroup', name, user);
  }

  removeGroup(name): void{
    console.log(name)
    this.socket.emit('removeGroup', name);
  }

  promoteUser(name){
    this.socket.emit('promote', name)
  }
}
