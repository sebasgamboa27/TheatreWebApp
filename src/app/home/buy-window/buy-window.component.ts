import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-buy-window',
  templateUrl: './buy-window.component.html',
  styleUrls: ['./buy-window.component.css']
})
export class BuyWindowComponent implements OnInit {

  currentMovie: Movie;

  constructor() { }

  ngOnInit(): void {
  }

  show(movie:Movie){
    this.currentMovie = movie;
    ($('#buyModal') as any).modal('show');
  }

}
