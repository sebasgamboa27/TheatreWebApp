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
  @Input() Nombre: string;
  @Input() Email: string;
  @Input() Telefono: string;
  alreadyCreatedClient: boolean;

  constructor(private database: DatabaseService, private employeeService: EmployeeServiceService){}


  ngOnInit(): void {
    this.getAmountToPay(this.tickets);
    this.receiptState = false;
    this.checkEmployeeService();
    this.alreadyCreatedClient = false;
  }

  async getAmountToPay(tickets: Seat[]){
    this.totalPrices = await this.database.getPricebySeat(tickets[0].SeatID, tickets[0].BlockID);
    debugger;
    if (this.totalPrices != null){
      this.priceToPay = this.totalPrices[0].price * this.tickets.length;
    }
  }

  checkEmployeeService(){
    if (this.employeeService.loginState){
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

    if (randomNumber % 2 === this.priceToPay % 2){
      this.cardRejected = false;
      this.receiptState = !this.receiptState;
      this.tickets.forEach(async seat => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDate().toString();

        const newDate = '\'' + year + '-' + month + '-' + day + '\'';

        const clientExists = await this.database.clientCheck(this.Email);
        debugger;

        if (clientExists[0][''] || this.alreadyCreatedClient){
          const clientID = await this.database.clientByEmail(this.Email);
          const receiptID = await this.database.insertReceipt(newDate, clientID[0].ID);
          console.log(receiptID[0].ID);
          await this.database.insertBookings(this.presentation.PresentationID, receiptID[0].ID, seat.SeatID);
        }
        else{
          debugger;
          this.alreadyCreatedClient = true;
          const clientID = await this.database.insertClient(this.Nombre, this.Email, this.Telefono);
          const receiptID = await this.database.insertReceipt(newDate, clientID[0].ID);
          console.log(receiptID[0].ID);
          await this.database.insertBookings(this.presentation.PresentationID, receiptID[0].ID, seat.SeatID);
        }
      });
    }
    else{
      this.cardRejected = true;
    }
  }

  makePaymentCash(){
    this.receiptState = !this.receiptState;
    this.tickets.forEach(async seat => {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
      const day = date.getDate().toString();

      const newDate = '\'' + year + '-' + month + '-' + day + '\'';

      const clientExists = await this.database.clientCheck(this.Email);

      if (clientExists[0][''] || this.alreadyCreatedClient){
        const clientID = await this.database.clientByEmail(this.Email);

        const receiptID = await this.database.insertReceipt(newDate, clientID[0].ID);
        console.log(receiptID[0].ID);
        await this.database.insertBookings(this.presentation.PresentationID, receiptID[0].ID, seat.SeatID);
      }
      else{
        this.alreadyCreatedClient = true;
        const clientID = await this.database.insertClient(this.Nombre, this.Email, this.Telefono);
        const receiptID = await this.database.insertReceipt(newDate, clientID[0].ID);
        console.log(receiptID[0].ID);
        await this.database.insertBookings(this.presentation.PresentationID, receiptID[0].ID, seat.SeatID);
      }

    });
  }

}
