import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminInfoService } from './admin-info.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  refreshed: boolean;
  adminName: string;
  theaterName: string;

  constructor(private adminService: AdminInfoService) {}

  ngOnInit(): void {

    this.adminName = this.adminService.adminName;
    this.theaterName = this.adminService.theaterName;
  }


}
