import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/interfaces/seat';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() tickets: Seat[];

  constructor() { }

  ngOnInit(): void {
  }

}
