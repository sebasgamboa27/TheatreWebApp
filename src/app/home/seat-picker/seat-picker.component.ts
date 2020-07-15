import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Presentation } from 'src/app/interfaces/presentation';
import { Block } from 'src/app/interfaces/block';
import { DatabaseService } from 'src/app/database.service';
import { Movie } from 'src/app/interfaces/movie';
import { Seat } from 'src/app/interfaces/seat';

@Component({
  selector: 'app-seat-picker',
  templateUrl: './seat-picker.component.html',
  styleUrls: ['./seat-picker.component.css']
})
export class SeatPickerComponent implements OnInit {

  blocks: Block[];
  selectedBlock: Block;
  seats: Seat[]
  occupiedSeats: Seat[];
  selectedPresentation: Presentation;
  selectedSeats: Seat[];
  selectedSeatsLength: number;

  @Input() movie: Movie;
  @Output() tickets = new EventEmitter<Seat[]>();

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async loadBlocks() {
    this.blocks = await this.database.getBlocksbyMovie(this.movie.ID);
  }

  async updateSelectedBlock(block:Block){
    this.resetSelectedSeats();
    this.selectedBlock = block;
    this.seats = await this.database.getSeatsbyBlock(this.selectedBlock.BlockID);
    this.refreshStates();
    if(this.selectedPresentation){
      this.refreshSeats(this.selectedPresentation)
    }

  }

  refreshStates(){
    this.seats.forEach(seat => {
      seat.state = 'available';
    });
  }

  reset(){
    this.blocks = [];
    this.selectedBlock = null;
    this.seats = [];
    this.occupiedSeats = [];
    this.selectedPresentation = null;
    this.resetSelectedSeats();
  }

  resetSelectedSeats(){
    this.selectedSeats = [];
    this.selectedSeatsLength = 0;
  }

  ngOnChanges(){
    if(this.movie){
      this.reset();
      this.loadBlocks();
    }
  }

  async refreshSeats(presentation:Presentation){

    this.resetSelectedSeats();

    this.selectedPresentation = presentation;

    if(this.selectedBlock){
      this.occupiedSeats = await this.database.getOccupiedSeats(this.selectedBlock.BlockID,presentation.PresentationID);

      this.seats.forEach(seat => {
        seat.state = this.getSeatState(seat);
      });
    }
  }

  getSeatState(seat: Seat) :string{
    for (let i = 0; i < this.occupiedSeats.length; i++) {
      if(seat.Number === this.occupiedSeats[i].Number && seat.Row === this.occupiedSeats[i].Row){
        return 'occupied'
      }
    }
    return 'available'

  }

  selectSeat(seat:Seat){
    if(seat.state!='occupied'){
      if(seat.state === 'available'){
        seat.state = 'selected';
        this.selectedSeats.push(seat);
        this.selectedSeatsLength+=1;
      }
      else{
        seat.state = 'available';
        this.selectedSeats.splice(this.selectedSeats.indexOf(seat),1);
        this.selectedSeatsLength-=1;
      }
    }
    console.log(this.selectedSeats);
  }


}