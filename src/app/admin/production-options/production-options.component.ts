import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-production-options',
  templateUrl: './production-options.component.html',
  styleUrls: ['./production-options.component.css']
})
export class ProductionOptionsComponent implements OnInit {


  @Input() TheaterName: string;
  productions: Movie[];
  displayState: string;
  theaterID: string;
  currentProduction: string;

  constructor(private database: DatabaseService) { }

  async ngOnInit(): Promise<void> {
    debugger;
    let tempID = await this.database.getTheaterID(this.TheaterName);
    this.theaterID = tempID[0].ID;
    this.productions = await this.database.getMoviesbyTheater(this.theaterID);
  }

  setPresentationState(){
    this.displayState = 'presentation';
  }

  setPriceState(){
    this.displayState = 'price';
  }

  setUpdateState(){
    this.displayState = 'update';
  }

  setCurrentProduction(ID:string){
    this.currentProduction = ID;
  }

}
