import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chambre } from '../model/chambre';

@Component({
  selector: 'app-update-chambre-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-chambre-input.html',
  styles: [],
})
export class UpdateChambreInput {
  @Input() chambre!: Chambre;
  @Input() ajout: boolean = true;

  @Output() chambreUpdated = new EventEmitter<Chambre>();

  saveChambre(): void {
    this.chambreUpdated.emit(this.chambre);
  }
}
