import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { AdminInfoService } from '../admin-info.service';

@Component({
  selector: 'app-sys-adim-login',
  templateUrl: './sys-adim-login.component.html',
  styleUrls: ['./sys-adim-login.component.css']
})
export class SysAdimLoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  loginState: string;

  constructor(private database: DatabaseService,private adminService: AdminInfoService) { }

  ngOnInit(): void {
  }

  async checkLogin(){
    let state = await this.database.checkSysAdmin(this.username,this.password);
    if(state[0]['']){
      let adminInfo = await this.database.getSysAdminInfo(this.username);
      this.adminService.sysAdminName = adminInfo[0].EmployeeName;
      this.loginState = 'logged';
    }
    else{
      this.loginState = 'not-logged';
    }
  }

  show(){
    ($('#sysadminLogin') as any).modal('show');
  }

  destroy(){
    ($('#sysadminLogin') as any).modal('dispose');
  }


}
