import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-empleado-login',
  templateUrl: './empleado-login.component.html',
  styleUrls: ['./empleado-login.component.css']
})
export class EmpleadoLoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  loginState: string;

  constructor(private database: DatabaseService,private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
  }

  show(){
    ($('#empleadoModal') as any).modal('show');
  }

  async checkLogin(){
    console.log(this.username);
    console.log(this.password);
    let state = await this.database.checkEmployeeLogin(this.username,this.password)
    if(state[0]['']){
      this.loginState = 'logged';
      this.employeeService.changeLoginState();
    }
    else{
      this.loginState = 'not-logged';
    }
  }

}
