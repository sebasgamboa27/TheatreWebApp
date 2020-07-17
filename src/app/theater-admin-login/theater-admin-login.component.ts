import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-theater-admin-login',
  templateUrl: './theater-admin-login.component.html',
  styleUrls: ['./theater-admin-login.component.css']
})
export class TheaterAdminLoginComponent implements OnInit {
  [x: string]: any;

  @Input() username: string;
  @Input() password: string;
  loginState: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async checkLogin(){
    let state = await this.database.checkTheaterAdmin(this.username,this.password)
    if(state[0]['']){
      this.loginState = 'logged';
    }
    else{
      this.loginState = 'not-logged';
    }
  }

  show(){
    ($('#adminLogin') as any).modal('show');
  }

}
