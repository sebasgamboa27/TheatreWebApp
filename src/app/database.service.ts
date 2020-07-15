import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Movie } from './interfaces/movie';
import { Theatre } from './interfaces/theatre';
import { Presentation } from './interfaces/presentation';
import { Block } from './interfaces/block';
import { Seat } from './interfaces/seat';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  async getMovies() {
    return await this.http.get<Movie[]>('http://localhost:3000/getMovies').toPromise();
  }

  async getTheatres() {
    return await this.http.get<Theatre[]>('http://localhost:3000/getTheatres').toPromise();
  }

  async getMoviesbyTheater(id) {
    return await this.http.post<Movie[]>('http://localhost:3000/getMoviesbyTheatre',{ID:id}).toPromise();
  }

  async getPresentationsByMovie(id) {
    return await this.http.post<Presentation[]>('http://localhost:3000/getPresentationsByMovie',{ID:id}).toPromise();
  }

  async getBlocksbyMovie(productionID: string) {
    return await this.http.post<Block[]>('http://localhost:3000/getBlocksbyMovie',{ProductionID:productionID}).toPromise();
  }

  async getSeatsbyBlock(blockID: string) {
    return await this.http.post<Seat[]>('http://localhost:3000/getSeatsbyBlock',{BlockID:blockID}).toPromise();
  }

}
