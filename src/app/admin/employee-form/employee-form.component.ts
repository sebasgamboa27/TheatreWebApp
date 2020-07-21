import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { AdminInfoService } from '../admin-info.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() Nombre: string;
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

  constructor(private database: DatabaseService,private adminService: AdminInfoService,private encryptor: EncrDecrServiceService) { }

  ngOnInit(): void {
  }

  async insertEmployee(){
    console.log(this.Nombre);
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

    let theaterID =parseInt(this.adminService.theaterID);

    console.log(theaterID);

    debugger;
    let encrypted = this.encryptor.set(this.Password);

    await this.database.insertEmployee(theaterID,this.ID,this.Nombre,this.Fecha_de_Nacimiento,this.Sexo,this.Direccion,
      this.Email,this.Telefono_Personal,this.Telefono_de_Hogar,this.Otro_Telefono,this.Username,encrypted);
  }

}
