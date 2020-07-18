import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css']
})
export class PresentationFormComponent implements OnInit {

  @Input() productionID: string;
  @Input() Hora: string;
  @Input() Fecha: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async insertPresentation(){
    console.log(this.productionID);
    console.log(this.Hora);
    console.log(this.Fecha);

    await this.database.insertPresentation(this.Hora,this.Fecha,this.productionID);

  }

}
