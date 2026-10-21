import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chambre } from '../model/chambre';
import { Hotel } from '../model/hotel';
import { ChambreService } from '../services/chambre.service';

@Component({
  selector: 'app-recherche-par-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-hotel.html',
  styles: '',
})
export class RechercheParHotel implements OnInit {
  chambres: Chambre[] = [];
  chambresFiltrees: Chambre[] = [];
  hotels: Hotel[] = [];
  selectedHotelId: number | null = null;

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.chambreService.listeChambres().subscribe({
      next: (data: any) => {
        this.chambres = Array.isArray(data) ? data : (data._embedded?.chambres ?? []);

        this.chambresFiltrees = this.chambres;
      },
      error: (err) => console.error('Erreur chambres :', err),
    });

    this.chambreService.listeHotels().subscribe({
      next: (data: any) => {
        console.log('Réponse API hôtels :', data);

        this.hotels = Array.isArray(data) ? data : (data._embedded?.hotels ?? []);

        console.log('Hôtels chargés :', this.hotels);
      },
      error: (err) => console.error('Erreur hôtels :', err),
    });
  }

  onChangeHotel(): void {
    if (this.selectedHotelId === null) {
      this.chambresFiltrees = this.chambres;
    } else {
      this.chambresFiltrees = this.chambres.filter(
        (chambre) => Number(chambre.hotel?.idHotel) === this.selectedHotelId,
      );
    }
  }
}
