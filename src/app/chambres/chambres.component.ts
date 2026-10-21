import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chambre } from '../model/chambre';
import { ChambreService } from '../services/chambre.service';

@Component({
  selector: 'app-chambres',
  imports: [DatePipe, RouterLink],
  templateUrl: './chambres.component.html',
})
export class ChambresComponent implements OnInit {
  chambres: Chambre[] = [];

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.chargerChambres();
  }

  chargerChambres(): void {
    this.chambreService.listeChambres().subscribe({
      next: (data: any) => {
        console.log('Réponse API complète :', data);

        if (Array.isArray(data)) {
          this.chambres = data;
        } else if (data._embedded?.chambres) {
          this.chambres = data._embedded.chambres;
        } else {
          this.chambres = [];
        }

        console.log('Chambres chargées :', this.chambres);
      },
      error: (err) => {
        console.error('Erreur API :', err);
      },
    });
  }
  supprimerChambre(chambre: Chambre): void {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.chambreService.supprimerChambre(chambre.idChambre).subscribe(() => {
        this.chargerChambres();
      });
    }
  }
}
