import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-empleado-login',
  templateUrl: './empleado-login.component.html',
  styleUrls: ['./empleado-login.component.css']
})
export class EmpleadoLoginComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  loginState: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  show(){
    ($('#empleadoModal') as any).modal('show');
  }

  async checkLogin(){
    console.log(this.email);
    console.log(this.password);
    if(await this.database.checkEmployeeLogin(this.email,this.password)){
      this.loginState = 'logged';
    }
    else{
      this.loginState = 'not-logged';
    }
  }

}
