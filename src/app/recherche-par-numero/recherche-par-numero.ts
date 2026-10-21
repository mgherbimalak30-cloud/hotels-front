import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chambre } from '../model/chambre';
import { ChambreService } from '../services/chambre.service';

@Component({
  selector: 'app-recherche-par-numero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-numero.html',
  styles: '',
})
export class RechercheParNumero implements OnInit {
  numero: string = '';
  chambres: Chambre[] = [];

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.chambreService.listeChambres().subscribe({
      next: (data: any) => {
        this.chambres = Array.isArray(data) ? data : (data._embedded?.chambres ?? []);
      },
      error: (err) => console.error('Erreur chambres :', err),
    });
  }

  rechercher(): void {
    if (this.numero.trim() !== '') {
      this.chambreService.rechercherParNumero(this.numero.trim()).subscribe({
        next: (data) => {
          this.chambres = data;
        },
        error: (err) => console.error('Erreur recherche :', err),
      });
    } else {
      this.chambreService.listeChambres().subscribe({
        next: (data: any) => {
          this.chambres = Array.isArray(data) ? data : (data._embedded?.chambres ?? []);
        },
        error: (err) => console.error('Erreur chambres :', err),
      });
    }
  }
}
