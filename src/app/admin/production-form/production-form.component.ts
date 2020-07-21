import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { AdminInfoService } from '../admin-info.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.css']
})
export class ProductionFormComponent implements OnInit {

  @Input() Nombre: string;
  @Input() Tipo: string;
  @Input() Fecha_de_Inicio: string;
  @Input() Fecha_de_Cierre: string;
  @Input() Descripcion: string;
  @Input() URL_Imagen: string;

  constructor(private database: DatabaseService,private adminService: AdminInfoService) { }

  ngOnInit(): void {
  }


  async insertProduction(){
    debugger;
    let ID =parseInt(this.adminService.theaterID);
    console.log(ID);

    await this.database.insertProduction(ID,this.Nombre,this.Tipo,this.Fecha_de_Inicio,
      this.Fecha_de_Cierre,this.Descripcion,this.URL_Imagen);
  }

}
