import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/interfaces/seat';
import { DatabaseService } from 'src/app/database.service';
import { Prices } from 'src/app/interfaces/price';
import { Presentation } from 'src/app/interfaces/presentation';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

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
  @Input() num: number;
  @Input() cvv: number;

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

  async makePayment(){
    //const randomNumber = Math.floor(Math.random() * (+30 - +1)) + +1;
    //console.log(randomNumber);

    if (this.num % 2 === this.cvv % 2){
      this.cardRejected = false;
      this.receiptState = !this.receiptState;

      const clientExists = await this.database.clientCheck(this.Email);
      let clientID;

      if (clientExists[0]['']){
        clientID = await this.database.clientByEmail(this.Email);
      }
      else{
        clientID = await this.database.insertClient(this.Nombre, this.Email, this.Telefono);
      }

      this.tickets.forEach(async seat => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDate().toString();

        const newDate = '\'' + year + '-' + month + '-' + day + '\'';
        let apCode = Math.floor(Math.random() * (+90000 - +1)) + +1; 
        let code = apCode.toString();

        await this.database.setUpBooking(newDate,code,clientID[0].ID,this.presentation.PresentationID,seat.SeatID);

      });
    
    }
    else{
      this.cardRejected = true;
    }
  }

  async makePaymentCash(){
    this.receiptState = !this.receiptState;

    const clientExists = await this.database.clientCheck(this.Email);
    let clientID;

    if (clientExists[0]['']){
      clientID = await this.database.clientByEmail(this.Email);
    }
    else{
      clientID = await this.database.insertClient(this.Nombre, this.Email, this.Telefono);
    }

    this.tickets.forEach(async seat => {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
      const day = date.getDate().toString();

      const newDate = '\'' + year + '-' + month + '-' + day + '\'';
      let apCode = Math.floor(Math.random() * (+90000 - +1)) + +1; 
      let code = apCode.toString();

      await this.database.setUpBooking(newDate,code,clientID[0].ID,this.presentation.PresentationID,seat.SeatID);

    });
  }

}
