import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.loadConnection();
  }

  async loadConnection(){
    try {
      await this.database.changeConnection();
    } catch (error) {
      console.log('error en home');
    }
  }

}
