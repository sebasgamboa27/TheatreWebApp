import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teatro-form',
  templateUrl: './teatro-form.component.html',
  styleUrls: ['./teatro-form.component.css']
})
export class TeatroFormComponent implements OnInit {

  @Input() Nombre: string;
  @Input() Email: number;
  @Input() Website: number;
  @Input() ClientServicePhone: string;
  @Input() TicketOfficePhone: string;

  constructor() { }

  ngOnInit(): void {
  }

  insertTheater(){
    console.log(this.Nombre);
    console.log(this.Email);
    console.log(this.Website);
    console.log(this.ClientServicePhone);
    console.log(this.TicketOfficePhone);
  }

}
