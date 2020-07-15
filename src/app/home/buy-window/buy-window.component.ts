import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Seat } from 'src/app/interfaces/seat';

@Component({
  selector: 'app-buy-window',
  templateUrl: './buy-window.component.html',
  styleUrls: ['./buy-window.component.css']
})
export class BuyWindowComponent implements OnInit {

  currentMovie: Movie;
  step: number;
  selectedSeats: Seat[];

  constructor() { }

  ngOnInit(): void {
  }

  show(movie:Movie){
    this.currentMovie = movie;
    ($('#buyModal') as any).modal('show');
    this.step = 1;
  }

  displayCheckout(seats: Seat[]){
    this.selectedSeats = seats;
    this.step = 2;
  }

}
