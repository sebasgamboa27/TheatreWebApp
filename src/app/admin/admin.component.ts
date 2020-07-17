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

    if(this.adminService.adminName!=null){
      this.adminName = this.adminService.adminName;
      this.theaterName = this.adminService.theaterName;

      localStorage.setItem('adminName',JSON.stringify(this.adminName));
      localStorage.setItem('theaterName',JSON.stringify(this.theaterName));
    }

    if (!localStorage.getItem('foo')) { 

      window.localStorage.setItem('foo', 'no reload') 
      location.reload() 

    }else {
      localStorage.removeItem('foo') 
    }

    this.adminName= JSON.parse(localStorage.getItem('adminName'));
    this.theaterName= JSON.parse(localStorage.getItem('theaterName'));


  }


}
