import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { nextTick } from 'q';
const SERVER_URL = 'http://124.176.29.78:3000/messaging'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  initSocket():void{
    this.socket = io(SERVER_URL);
  }

  getRooms(){
    this.socket.emit("getRooms", "message")
  }

  roomList(rooms){
    this.socket.on("roomList", res=>rooms(res));
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
}
