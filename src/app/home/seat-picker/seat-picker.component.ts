import { Component, OnInit, Input } from '@angular/core';
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
  @Input() movie: Movie;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async loadBlocks() {
    this.blocks = await this.database.getBlocksbyMovie(this.movie.ID);
  }

  async updateSelectedBlock(block:Block){
    this.selectedBlock = block;
    this.seats = await this.database.getSeatsbyBlock(this.selectedBlock.BlockID);
  }

  ngOnChanges(){
    if(this.movie){
      this.loadBlocks();
    }
  }

  async refreshSeats(presentation:Presentation){
    debugger;
    this.occupiedSeats = await this.database.getOccupiedSeats(this.selectedBlock.BlockID,presentation.PresentationID);

    this.seats.forEach(seat => {
      seat.state = this.getSeatState(seat);
    });
  }

  getSeatState(seat: Seat) :string{
    for (let i = 0; i < this.occupiedSeats.length; i++) {
      if(seat.Number === this.occupiedSeats[i].Number && seat.Row === this.occupiedSeats[i].Row){
        return 'occupied'
      }
    }
    return 'available'

  }
}