import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Movie } from './interfaces/movie';
import { Theatre } from './interfaces/theatre';
import { Presentation } from './interfaces/presentation';
import { Block } from './interfaces/block';
import { Seat } from './interfaces/seat';
import { Prices } from './interfaces/price';
import { ReceiptID } from './interfaces/receiptID';

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

  async getOccupiedSeats(blockID: string,presentationID: string) {
    return await this.http.post<Seat[]>('http://localhost:3000/getOccupiedSeats',{BlockID:blockID,PresentationID:presentationID}).toPromise();
  }

  async getPricebySeat(ticket: string, blockID:string) {
    return await this.http.post<any>('http://localhost:3000/getPricebySeat',{SeatID:ticket,BlockID:blockID}).toPromise();
  }

  async insertReceipt(date:string) {
    let apCode = Math.floor(Math.random() * (+3000 - +1)) + +1; 
    let ClientID = Math.floor(Math.random() * (+5 - +1)) + +1; 
    return await this.http.post<ReceiptID>('http://localhost:3000/insertReceipt',{Date:date,ApprobationCode:apCode,ClientID:ClientID}).toPromise();
  }

  async insertBookings(presentationID: string, paymentID:string,SeatID:string) {
    return await this.http.post<ReceiptID>('http://localhost:3000/insertBookings',{PresentationID:presentationID,PaymentID:paymentID,SeatID:SeatID}).toPromise();
  }

  async checkEmployeeLogin(username: string, password:string) {
    return await this.http.post<any>('http://localhost:3000/checkEmployeeLogin',{Username:username,Password:password}).toPromise();
  }

  async checkTheaterAdmin(username: string, password:string) {
    return await this.http.post<any>('http://localhost:3000/checkTheaterAdmin',{Username:username,Password:password}).toPromise();
  }

  async getAdminInfo(username: string) {
    return await this.http.post<any>('http://localhost:3000/getAdminInfo',{Username:username}).toPromise();
  }

  async insertProduction(TheaterID: number,Name: string,Type: string,Start: string,End: string,Description: string,ImageURL: string) {
    return await this.http.post<any>('http://localhost:3000/insertProduction',
    {TheaterID:TheaterID,Name:Name,Type:Type,Start:Start,
      End:End,Description:Description,ImageURL:ImageURL}).toPromise();


  }


}
