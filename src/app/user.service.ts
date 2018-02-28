import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  name : string;
  constructor() { }

  setUser(name){
    this.name = name;
  }

  getUser(){
    return this.name;
  }

}
