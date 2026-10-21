import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chambre } from '../model/chambre';
import { Hotel } from '../model/hotel';
import { ChambreService } from '../services/chambre.service';

@Component({
  selector: 'app-update-chambre',
  imports: [FormsModule, DatePipe],
  templateUrl: './update-chambre.component.html',
})
export class UpdateChambreComponent implements OnInit {
  currentChambre = new Chambre();
  hotels: Hotel[] = [];
  updatedHotelId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService,
  ) {}

  ngOnInit(): void {
    this.chambreService.listeHotels().subscribe({
        next: (data: any) => {
          console.log('Réponse API hôtels :', data);

          this.hotels = Array.isArray(data)
            ? data
            : data._embedded?.hotels ?? [];
        },
      error: (err) => {
        console.error('Erreur lors du chargement des hôtels :', err);
      },
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);

    this.chambreService.consulterChambre(id).subscribe((chambre) => {
      this.currentChambre = chambre;
      this.updatedHotelId = chambre.hotel?.idHotel;
    });
  }

  updateChambre(): void {
    const hotel = this.hotels.find((h) => h.idHotel == this.updatedHotelId);

    if (hotel) {
      this.currentChambre.hotel = hotel;

      this.chambreService.updateChambre(this.currentChambre).subscribe(() => {
        this.router.navigate(['chambres']);
      });
    }
  }
}
