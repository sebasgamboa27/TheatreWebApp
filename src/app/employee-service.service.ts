import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  loginState: boolean;
  employeeTheaterID: string;
  employeeName: string;

  constructor() { this.loginState = false;}

  changeLoginState(){
    this.loginState = !this.loginState;
  }
  
}
