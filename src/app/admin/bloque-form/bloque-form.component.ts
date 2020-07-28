import { Component, OnInit, Input } from '@angular/core';
import { Theatre } from 'src/app/interfaces/theatre';
import { DatabaseService } from 'src/app/database.service';
import { Block } from 'src/app/interfaces/block';

@Component({
  selector: 'app-bloque-form',
  templateUrl: './bloque-form.component.html',
  styleUrls: ['./bloque-form.component.css']
})
export class BloqueFormComponent implements OnInit {

  selectedTheatre: Theatre;
  theatres: Theatre[] = [];

  blocks: Block[];
  selectedBlock: Block;

  @Input() Nombre_Bloque: string;

  @Input() Fila: string;
  @Input() Numero: number;

  constructor(private database: DatabaseService) { }

  async ngOnInit(): Promise<void> {
    this.theatres = await this.database.getTheatres();
    this.selectTheatre(this.theatres[0]);
    this.loadBlocks();
  }

  selectTheatre(theatre:Theatre){
    this.selectedTheatre = theatre;
    this.loadBlocks();
  }

  async insertBlock(){
    await this.database.insertBlock(this.Nombre_Bloque,parseInt(this.selectedTheatre.ID));
  }

  updateSelectedBlock(block:Block){
    this.selectedBlock = block;
  }

  async loadBlocks() {
    this.selectedBlock = null;
    this.blocks = await this.database.blocksByTheater(parseInt(this.selectedTheatre.ID));
  }

  async insertRow(){
    debugger;
    let id = parseInt(this.selectedBlock.BlockID);
    await this.database.insertRow(this.Fila,id,this.Numero);
  }

}
