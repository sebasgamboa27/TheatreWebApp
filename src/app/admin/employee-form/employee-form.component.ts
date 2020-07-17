import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() Nombre: string;
  @Input() Fecha_de_Nacimiento: string;
  @Input() Sexo: string;
  @Input() Direccion: string;
  @Input() Email: string;
  @Input() Telefono_Personal: string;
  @Input() Telefono_de_Hogar: string;
  @Input() Otro_Telefono: string;
  @Input() Username: string;
  @Input() Password: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  insertEmployee(){
    console.log(this.Nombre);
    console.log(this.Fecha_de_Nacimiento);
    console.log(this.Sexo);
    console.log(this.Direccion);
    console.log(this.Email);
    console.log(this.Telefono_Personal);
    console.log(this.Telefono_de_Hogar);
    console.log(this.Otro_Telefono);
    console.log(this.Username);
    console.log(this.Password);
  }

}
