import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Movie } from 'src/app/interfaces/movie';
import { Theatre } from 'src/app/interfaces/theatre';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-teatro-employee-form',
  templateUrl: './teatro-employee-form.component.html',
  styleUrls: ['./teatro-employee-form.component.css']
})
export class TeatroEmployeeFormComponent implements OnInit {

  @Input() Nombre: string;
  @Input() Theater: string;
  @Input() ID: number;
  @Input() Fecha_de_Nacimiento: string;
  @Input() Sexo: string;
  @Input() Direccion: string;
  @Input() Email: string;
  @Input() Telefono_Personal: string;
  @Input() Telefono_de_Hogar: string;
  @Input() Otro_Telefono: string;
  @Input() Username: string;
  @Input() Password: string;
  theaters: Theatre[];

  constructor(private database: DatabaseService,private encryptor: EncrDecrServiceService) { }

  async ngOnInit(): Promise<void> {
    this.theaters = await this.database.getTheatres();
  }

  async insertEmployee(){
    console.log(this.Nombre);
    console.log(this.Theater);
    console.log(this.ID);
    console.log(this.Fecha_de_Nacimiento);
    console.log(this.Sexo);
    console.log(this.Direccion);
    console.log(this.Email);
    console.log(this.Telefono_Personal);
    console.log(this.Telefono_de_Hogar);
    console.log(this.Otro_Telefono);
    console.log(this.Username);
    console.log(this.Password);

    let theaterInfo = await this.database.getTheaterID(this.Theater);
    let theaterID = theaterInfo[0].ID;

    debugger;

    let encrypted = this.encryptor.set(this.Password);

    await this.database.insertAdmins(theaterID,this.ID,this.Nombre,this.Fecha_de_Nacimiento,this.Sexo,this.Direccion,
      this.Email,this.Telefono_Personal,this.Telefono_de_Hogar,this.Otro_Telefono,this.Username,encrypted);
  }

}
