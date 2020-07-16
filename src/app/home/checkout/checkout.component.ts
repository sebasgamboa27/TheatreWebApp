import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/interfaces/seat';
import { DatabaseService } from 'src/app/database.service';
import { Prices } from 'src/app/interfaces/price';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() tickets: Seat[];
  priceToPay: number;
  totalPrices: Prices;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.getAmountToPay(this.tickets);
  }

  async getAmountToPay(tickets: Seat[]){
    this.totalPrices = await this.database.getPricebySeat(tickets[0].SeatID,tickets[0].BlockID);
    console.log(this.totalPrices);
    if(this.totalPrices != null){
      this.priceToPay = this.totalPrices[0].Price * this.tickets.length;
      console.log(this.totalPrices[0].Price);
    }
  }

  ngOnChanges(){
    this.getAmountToPay(this.tickets);
  }
}