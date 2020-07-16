import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/interfaces/seat';
import { DatabaseService } from 'src/app/database.service';
import { Prices } from 'src/app/interfaces/price';
import { Presentation } from 'src/app/interfaces/presentation';
import { EmployeeServiceService } from 'src/app/employee-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() tickets: Seat[];
  priceToPay: number;
  totalPrices: Prices;
  @Input() presentation: Presentation;
  receiptState: boolean;
  cardRejected: boolean;
  loginState: boolean;

  constructor(private database: DatabaseService,private employeeService: EmployeeServiceService){}


  ngOnInit(): void {
    this.getAmountToPay(this.tickets);
    this.receiptState = false;
    this.checkEmployeeService();
  }

  async getAmountToPay(tickets: Seat[]){
    this.totalPrices = await this.database.getPricebySeat(tickets[0].SeatID,tickets[0].BlockID);
    debugger;
    if(this.totalPrices != null){
      this.priceToPay = this.totalPrices[0].price * this.tickets.length;
    }
  }

  checkEmployeeService(){
    if(this.employeeService.loginState){
      this.loginState = true;
    }
    else{
      this.loginState = false;
    }
  }

  ngOnChanges(){
    this.getAmountToPay(this.tickets);
  }

  makePayment(){
    const randomNumber = Math.floor(Math.random() * (+30 - +1)) + +1; 
    console.log(randomNumber);

    if(randomNumber%2 === this.priceToPay%2){
      this.cardRejected = false;
      this.receiptState = !this.receiptState;
      this.tickets.forEach(async seat => {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        let day = date.getDate().toString();

        let newDate = "'"+year+"-"+month+"-"+day+"'";

        let receiptID = await this.database.insertReceipt(newDate);
        console.log(receiptID[0].ID);
        await this.database.insertBookings(this.presentation.PresentationID,receiptID[0].ID,seat.SeatID);
      });
    }
    else{
      this.cardRejected = true;
    }
  }

  makePaymentCash(){
    this.receiptState = !this.receiptState;
    this.tickets.forEach(async seat => {
      let date = new Date();
      let year = date.getFullYear().toString();
      let month = date.getMonth().toString();
      let day = date.getDate().toString();

      let newDate = "'"+year+"-"+month+"-"+day+"'";

      let receiptID = await this.database.insertReceipt(newDate);
      console.log(receiptID[0].ID);
      await this.database.insertBookings(this.presentation.PresentationID,receiptID[0].ID,seat.SeatID);
    });
  }

}