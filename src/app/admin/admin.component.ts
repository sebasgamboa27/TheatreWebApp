import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminInfoService } from './admin-info.service';
import { DatabaseService } from '../database.service';
import {Location} from '@angular/common'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  refreshed: boolean;
  adminName: string;
  theaterName: string;
  theaterID: string;

  constructor(private adminService: AdminInfoService,private database: DatabaseService,private router: Router
    ,private route: ActivatedRoute,) {}

  ngOnInit(): void {

    this.adminName = this.adminService.adminName;
    this.theaterName = this.adminService.theaterName;
    this.theaterID = this.adminService.theaterID;
    
  }

  async changeDBConnection(){
    await this.database.changeConnection();
    this.router.navigate([''], { relativeTo: this.route });
  }


}
