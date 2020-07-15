import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Presentation } from 'src/app/interfaces/presentation';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent implements OnInit {

  @Input() movie: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
