import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Seat } from 'src/app/interfaces/seat';
import { Presentation } from 'src/app/interfaces/presentation';

@Component({
  selector: 'app-buy-window',
  templateUrl: './buy-window.component.html',
  styleUrls: ['./buy-window.component.css']
})
export class BuyWindowComponent implements OnInit {

  currentMovie: Movie;
  step: number;
  selectedSeats: Seat[];
  selectedPresentation: Presentation;
  buyable: boolean;

  constructor() {
    this.buyable = true;
  }

  ngOnInit(): void {
  }

  show(movie: Movie){
    this.currentMovie = movie;
    if (this.currentMovie.State === 'Anunciada' ) {
      this.buyable = false;
    }
    if (this.currentMovie.State === 'Anunciada' || this.currentMovie.State === 'Abierta') {
      ($('#buyModal') as any).modal('show');
      this.step = 1;
    }
  }

  displayCheckout(seats: Seat[]){
    this.selectedSeats = seats;
    this.step = 2;
  }

  savePresentation(presentaton: Presentation){
    this.selectedPresentation = presentaton;
  }

}
