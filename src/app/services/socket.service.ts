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
}
