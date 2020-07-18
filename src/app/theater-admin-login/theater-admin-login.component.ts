import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DatabaseService } from '../database.service';
import { AdminInfoService } from '../admin/admin-info.service';

@Component({
  selector: 'app-theater-admin-login',
  templateUrl: './theater-admin-login.component.html',
  styleUrls: ['./theater-admin-login.component.css']
})
export class TheaterAdminLoginComponent implements OnInit,OnDestroy{
  [x: string]: any;

  @Input() username: string;
  @Input() password: string;
  loginState: string;

  constructor(private database: DatabaseService,private adminService: AdminInfoService) { }
  
  ngOnDestroy(): void {
    ($('#adminLogin') as any).modal('dispose');
  }

  ngOnInit(): void {
  }

  async checkLogin(){
    let state = await this.database.checkTheaterAdmin(this.username,this.password);
    if(state[0]['']){
      let adminInfo = await this.database.getAdminInfo(this.username);
      this.adminService.adminName = adminInfo[0].EmployeeName;
      this.adminService.theaterName = adminInfo[0].TheaterName;
      this.loginState = 'logged';
    }
    else{
      this.loginState = 'not-logged';
    }
  }

  show(){
    ($('#adminLogin') as any).modal('show');
  }

  destroy(){
    ($('#adminLogin') as any).modal('dispose');
  }


}
