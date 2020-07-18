import { Component, OnInit } from '@angular/core';
import { AdminInfoService } from '../admin-info.service';

@Component({
  selector: 'app-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.css']
})
export class SysAdminComponent implements OnInit {

  adminName: string;

  constructor(private adminService: AdminInfoService) { }

  ngOnInit(): void {
    this.adminName = this.adminService.sysAdminName;
  }

}
