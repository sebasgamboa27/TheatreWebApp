import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-teatro-form',
  templateUrl: './teatro-form.component.html',
  styleUrls: ['./teatro-form.component.css']
})
export class TeatroFormComponent implements OnInit {

  @Input() Nombre: string;
  @Input() Email: string;
  @Input() Website: string;
  @Input() ClientServicePhone: string;
  @Input() TicketOfficePhone: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async insertTheater(){
    console.log(this.Nombre);
    console.log(this.Email);
    console.log(this.Website);
    console.log(this.ClientServicePhone);
    console.log(this.TicketOfficePhone);

    await this.database.insertTheater(this.Nombre,this.Email,this.Website,this.ClientServicePhone,this.TicketOfficePhone);
  }

}
