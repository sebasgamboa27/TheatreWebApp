import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  loginState: boolean;

  constructor() { this.loginState = false;}

  changeLoginState(){
    this.loginState = !this.loginState;
  }
  
}
