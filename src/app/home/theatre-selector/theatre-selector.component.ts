import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Theatre } from 'src/app/interfaces/theatre';
import { DatabaseService } from 'src/app/database.service';
import { CarteleraComponent } from 'src/app/home/cartelera/cartelera.component';
import { EmployeeServiceService } from 'src/app/employee-service.service';

@Component({
  selector: 'app-theatre-selector',
  templateUrl: './theatre-selector.component.html',
  styleUrls: ['./theatre-selector.component.css']
})
export class TheatreSelectorComponent implements OnInit {

  selectedTheatre: Theatre;
  theatres: Theatre[] = [];
  @Output() select = new EventEmitter<Theatre>();

  constructor(private database: DatabaseService,private employeeService: EmployeeServiceService) { }

  async ngOnInit(): Promise<void> {
    this.theatres = await this.database.getTheatres();
    this.selectTheatre(this.theatres[0]);
  }

  selectTheatre(theatre:Theatre){
    this.select.emit(theatre);
    this.selectedTheatre = theatre;
  }

  employeeRestrictTheaters(){
    if(this.employeeService.loginState){
      debugger;
      let newTheatres;
      for (let index = 0; index < this.theatres.length; index++) {
        if(this.theatres[index].ID === this.employeeService.employeeTheaterID){
          newTheatres = this.theatres[index];
        }
      }
      this.theatres = [];
      this.theatres.push(newTheatres);
      this.selectTheatre(this.theatres[0]);
    }
  }

}
