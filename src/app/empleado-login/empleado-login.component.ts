import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from '../database.service';
import { EmployeeServiceService } from '../employee-service.service';
import { EncrDecrServiceService } from '../encr-decr-service.service';

@Component({
  selector: 'app-empleado-login',
  templateUrl: './empleado-login.component.html',
  styleUrls: ['./empleado-login.component.css']
})
export class EmpleadoLoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  loginState: string;
  @Output() state = new EventEmitter<boolean>();

  constructor(private database: DatabaseService,private employeeService: EmployeeServiceService,private encryptor: EncrDecrServiceService) { }

  ngOnInit(): void {
  }

  show(){
    ($('#empleadoModal') as any).modal('show');
  }

  async checkLogin(){
    console.log(this.username);
    console.log(this.password);

    debugger;
    let encrypted = this.encryptor.set(this.password);

    let state = await this.database.checkEmployeeLogin(this.username,encrypted)
    if(state[0]['']){
      this.loginState = 'logged';
      this.employeeService.changeLoginState();
      let info = await this.database.employeeInfoAux(this.username);
      this.employeeService.employeeName = info[0].EmployeeName;
      this.employeeService.employeeTheaterID = info[0].TheaterID;
      this.state.emit(true);
    }
    else{
      this.loginState = 'not-logged';
    }
  }

}
