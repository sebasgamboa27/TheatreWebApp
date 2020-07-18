import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.css']
})
export class StateFormComponent implements OnInit {

  @Input() productionID: string;
  updateState: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.updateState = 'Estado';
  }

  changeState(state:string){
    this.updateState = state;
  }

  async insertState(){
    console.log(this.productionID);
    console.log(this.updateState);
    await this.database.updateProductionState(this.updateState,this.productionID);
  }

}
