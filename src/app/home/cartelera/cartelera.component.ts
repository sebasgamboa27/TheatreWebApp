import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Movie } from 'src/app/interfaces/movie';
import { EmployeeServiceService } from 'src/app/employee-service.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private database: DatabaseService) { }

  async ngOnInit(): Promise<void> {
  }

  async displayMovies(theatreID:string):Promise<void>{
    this.movies = await this.database.getCinemaListings(theatreID);
  }

}
