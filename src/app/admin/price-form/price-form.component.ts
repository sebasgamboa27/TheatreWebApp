import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent implements OnInit {

  @Input() productionID: string;
  @Input() ID_Bloque: string;
  @Input() Precio: string;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async insertPrice(){
    console.log(this.productionID);
    console.log(this.ID_Bloque);
    console.log(this.Precio);

    await this.database.insertPrice(this.productionID,this.ID_Bloque,this.Precio);
  }

}
