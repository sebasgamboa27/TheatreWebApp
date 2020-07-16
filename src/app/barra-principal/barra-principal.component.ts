import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-principal',
  templateUrl: './barra-principal.component.html',
  styleUrls: ['./barra-principal.component.css']
})
export class BarraPrincipalComponent implements OnInit {

  employeeLogin: boolean;

  constructor() { }

  ngOnInit(): void {
    this.employeeLogin = false;
  }

  showEmployeeLogin(){
    this.employeeLogin = true;
    debugger;
  }

}
