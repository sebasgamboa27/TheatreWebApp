import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-barra-principal',
  templateUrl: './barra-principal.component.html',
  styleUrls: ['./barra-principal.component.css']
})
export class BarraPrincipalComponent implements OnInit {

  employeeLogin: boolean;
  employeeName: string;
  loginState: boolean;
  @Output() employee = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeLogin = false;
  }

  showEmployeeLogin(){
    this.employeeLogin = true;
  }

  changeState(state: boolean){
    debugger;
    this.loginState = state;
    this.employeeName = this.employeeService.employeeName;
    this.employee.emit(true);
  }

}
