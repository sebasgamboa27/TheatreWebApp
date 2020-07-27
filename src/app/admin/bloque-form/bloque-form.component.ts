import { Component, OnInit, Input } from '@angular/core';
import { Theatre } from 'src/app/interfaces/theatre';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-bloque-form',
  templateUrl: './bloque-form.component.html',
  styleUrls: ['./bloque-form.component.css']
})
export class BloqueFormComponent implements OnInit {

  selectedTheatre: Theatre;
  theatres: Theatre[] = [];

  @Input() Nombre_Bloque: string;

  constructor(private database: DatabaseService) { }

  async ngOnInit(): Promise<void> {
    this.theatres = await this.database.getTheatres();
    this.selectTheatre(this.theatres[0]);
  }

  selectTheatre(theatre:Theatre){
    this.selectedTheatre = theatre;
  }

  async insertBlock(){
    await this.database.insertBlock(this.Nombre_Bloque,parseInt(this.selectedTheatre.ID));
  }

}
