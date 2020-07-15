import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Presentation } from 'src/app/interfaces/presentation';
import { Seat } from 'src/app/interfaces/seat';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent implements OnInit {

  @Input() movie: Movie;
  selectedSeats: Seat[];
  @Output() ticketSelected = new EventEmitter<Seat[]>();

  constructor() { }

  ngOnInit(): void {
  }

  saveSelectedSeats(seats:Seat[]){
    this.selectedSeats = seats;
    this.ticketSelected.emit(this.selectedSeats);
  }

}
