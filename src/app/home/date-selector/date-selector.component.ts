import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Presentation } from 'src/app/interfaces/presentation';
import { Movie } from 'src/app/interfaces/movie';
import { DatabaseService } from 'src/app/database.service';
import { IHash } from 'src/app/interfaces/ihash';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit,OnChanges {

  presentations: Presentation[];
  orderedTimes;
  @Input() movie: Movie;

  selectedPresentation: Presentation;
  @Output() selected = new EventEmitter<Presentation>();

  constructor(private database: DatabaseService) { }

  async ngOnInit(): Promise<void> {
  }

  ngOnChanges(){
    if(this.movie){
      this.updatePresentations();
    }
  }

  selectPresentation(presentation:Presentation){
    this.selectedPresentation = presentation;
    this.selected.emit(presentation);
  }

  async updatePresentations(){
    this.presentations = await this.database.getPresentationsByMovie(this.movie.ID);
    if (this.presentations.length === 0) return;

    let day = new Date(this.presentations[0].Date).getDay();
    let currentTimes = [];
    let newPresentations = [];

    for (let i = 0; i < this.presentations.length; i++) {
      if(new Date(this.presentations[i].Date).getDay() === day){
        currentTimes.push(this.presentations[i]);
      }
      else{
        newPresentations.push(currentTimes);
        currentTimes = [];
        currentTimes.push(this.presentations[i])
      }
    }

    if(currentTimes.length > 0) {
      newPresentations.push(currentTimes);
    }

    this.orderedTimes = newPresentations;
  }


}
