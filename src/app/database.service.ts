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

  async getCinemaListings(id){
    return await this.http.post<Movie[]>('http://localhost:3000/getCinemaListings',{ID:id}).toPromise();
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

  async clientByEmail(Email: string) {
    return await this.http.post<any[]>('http://localhost:3000/clientByEmail',{Email:Email}).toPromise();
  }

  async clientCheck(Email: string) {
    return await this.http.post<any[]>('http://localhost:3000/clientCheck',{Email:Email}).toPromise();
  }

  async insertClient(Nombre: string, Email:string,Telefono:string) {
    return await this.http.post<any>('http://localhost:3000/insertClient',{Nombre:Nombre,Email:Email,Telefono:Telefono}).toPromise();
  }

  async getOccupiedSeats(blockID: string,presentationID: string) {
    return await this.http.post<Seat[]>('http://localhost:3000/getOccupiedSeats',{BlockID:blockID,PresentationID:presentationID}).toPromise();
  }

  async getPricebySeat(ticket: string, blockID:string) {
    return await this.http.post<any>('http://localhost:3000/getPricebySeat',{SeatID:ticket,BlockID:blockID}).toPromise();
  }

  async insertReceipt(date:string,ClientID:number) {
    let apCode = Math.floor(Math.random() * (+90000 - +1)) + +1;  
    return await this.http.post<ReceiptID>('http://localhost:3000/insertReceipt',{Date:date,ApprobationCode:apCode,ClientID:ClientID}).toPromise();
  }

  async insertBookings(presentationID: string, paymentID:string,SeatID:string) {
    return await this.http.post<ReceiptID>('http://localhost:3000/insertBookings',{PresentationID:presentationID,PaymentID:paymentID,SeatID:SeatID}).toPromise();
  }

  async insertPresentation(Hour: string, Date:string,ProductionID:string) {
    return await this.http.post<any>('http://localhost:3000/insertPresentation',{Hour:Hour,Date:Date,ProductionID:ProductionID}).toPromise();
  }

  async presentationsByDate(ProductionID: string, startDate:string,endDate:string) {
    return await this.http.post<any>('http://localhost:3000/presentationsByDate',{ProductionID:ProductionID,startDate:startDate,endDate:endDate}).toPromise();
  }

  async insertPrice(ProductionID: string, BlockID:string,Price:string) {
    return await this.http.post<any>('http://localhost:3000/insertPrice',{ProductionID:ProductionID,BlockID:BlockID,Price:Price}).toPromise();
  }

  async updateProductionState(UpdateState: string, ProductionID:string) {
    return await this.http.post<any>('http://localhost:3000/updateProductionState',{UpdateState:UpdateState,ProductionID:ProductionID}).toPromise();
  }

  async checkEmployeeLogin(username: string, password:string) {
    return await this.http.post<any>('http://localhost:3000/checkEmployeeLogin',{Username:username,Password:password}).toPromise();
  }

  async checkSysAdmin(username: string, password:string) {
    return await this.http.post<any>('http://localhost:3000/checkSysAdmin',{Username:username,Password:password}).toPromise();
  }

  async checkTheaterAdmin(username: string, password:string) {
    return await this.http.post<any>('http://localhost:3000/checkTheaterAdmin',{Username:username,Password:password}).toPromise();
  }

  async getAdminInfo(username: string) {
    return await this.http.post<any>('http://localhost:3000/getAdminInfo',{Username:username}).toPromise();
  }

  async getSysAdminInfo(username: string) {
    return await this.http.post<any>('http://localhost:3000/getSysAdminInfo',{Username:username}).toPromise();
  }

  async employeeInfo(username: string) {
    return await this.http.post<any>('http://localhost:3000/getEmployeeInfo',{Username:username}).toPromise();
  }

  async employeeInfoAux(username: string) {
    return this.employeeInfo(username);
  }

  async getTheaterID(TheaterName: string) {
    return await this.http.post<any>('http://localhost:3000/getTheaterID',{TheaterName:TheaterName}).toPromise();
  }

  async insertProduction(TheaterID: number,Name: string,Type: string,Start: string,End: string,Description: string,ImageURL: string) {
    return await this.http.post<any>('http://localhost:3000/insertProduction',
    {TheaterID:TheaterID,Name:Name,Type:Type,Start:Start,
      End:End,Description:Description,ImageURL:ImageURL}).toPromise();

  }

  async insertTheater(Nombre: string,Email: string,Website: string,ClientServicePhone: string,TicketOfficePhone: string) {
    return await this.http.post<any>('http://localhost:3000/insertTheater',
    {Nombre:Nombre,Email:Email,Website:Website,ClientServicePhone:ClientServicePhone,
      TicketOfficePhone:TicketOfficePhone}).toPromise();

  }

  async setUpBooking(Date: string,Code: string,ClientID: string,PresentationID: string,SeatID: string) {
    return await this.http.post<any>('http://localhost:3000/setUpBooking',
    {Date:Date,Code:Code,ClientID:ClientID,PresentationID:PresentationID,
      SeatID:SeatID}).toPromise();

  }



  async insertEmployee(TheaterID: number,ID: number,Name: string,Birth: string,Sex: string,Address: string,Email: string,
    PersonalP: string,HomeP: string,OtherP: string,Username: string,Password: string) {

    return await this.http.post<any>('http://localhost:3000/insertEmployee',
    {TheaterID:TheaterID,ID:ID,Name:Name,Birth:Birth,Sex:Sex,Address:Address,Email:Email,
      PersonalP:PersonalP,HomeP:HomeP,OtherP:OtherP,Username:Username,Password:Password}).toPromise();

  }

  async insertAdmins(TheaterID: number,ID: number,Name: string,Birth: string,Sex: string,Address: string,Email: string,
    PersonalP: string,HomeP: string,OtherP: string,Username: string,Password: string) {

    return await this.http.post<any>('http://localhost:3000/insertAdmins',
    {TheaterID:TheaterID,ID:ID,Name:Name,Birth:Birth,Sex:Sex,Address:Address,Email:Email,
      PersonalP:PersonalP,HomeP:HomeP,OtherP:OtherP,Username:Username,Password:Password}).toPromise();

  }

  async changeConnection() {
    try {
      return await this.http.post<any>('http://localhost:3000/changeConnection',{}).toPromise();
    } catch (error) {
      console.log(error);
    }
  }
  
}
