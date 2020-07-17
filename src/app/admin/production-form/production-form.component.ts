import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.css']
})
export class ProductionFormComponent implements OnInit {

  @Input() ID_de_Teatro: number;
  @Input() Nombre: string;
  @Input() Tipo: string;
  @Input() Fecha_de_Inicio: string;
  @Input() Fecha_de_Cierre: string;
  @Input() Descripcion: string;
  @Input() URL_Imagen: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async insertProduction(){
    await this.database.insertProduction(this.ID_de_Teatro,this.Nombre,this.Tipo,this.Fecha_de_Inicio,
      this.Fecha_de_Cierre,this.Descripcion,this.URL_Imagen);
  }

}
