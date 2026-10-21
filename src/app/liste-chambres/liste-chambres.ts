import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chambre } from '../model/chambre';
import { ChambreService } from '../services/chambre.service';
import { UpdateChambreInput } from '../update-chambre-input/update-chambre-input';

@Component({
  selector: 'app-liste-chambres',
  standalone: true,
  imports: [CommonModule, UpdateChambreInput],
  templateUrl: './liste-chambres.html',
  styles: '',
})
export class ListeChambres implements OnInit {
  chambres!: Chambre[];

  chambreSelectionnee?: Chambre;
  modeModification = false;

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.chargerChambres();
  }

  chargerChambres(): void {
    this.chambreService.listeChambres().subscribe({
      next: (data: any) => {
        this.chambres = Array.isArray(data) ? data : (data._embedded?.chambres ?? []);

        console.log('Nombre de chambres :', this.chambres.length);
      },
      error: (err) => console.error('Erreur chambres :', err),
    });
  }

  modifierChambre(chambre: Chambre): void {
    this.chambreSelectionnee = { ...chambre };
    this.modeModification = true;
  }

  annulerModification(): void {
    this.chambreSelectionnee = undefined;
    this.modeModification = false;
  }

  recevoirChambreModifiee(chambre: Chambre): void {
    this.chambreService.updateChambre(chambre).subscribe({
      next: () => {
        this.modeModification = false;
        this.chambreSelectionnee = undefined;
        this.chargerChambres();
      },
      error: (err) => console.error('Erreur de modification :', err),
    });
  }
}
