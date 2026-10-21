import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chambre } from '../model/chambre';
import { Hotel } from '../model/hotel';
import { ChambreService } from '../services/chambre.service';

@Component({
  selector: 'app-add-chambre',
  imports: [FormsModule],
  templateUrl: './add-chambre.component.html',
})
export class AddChambreComponent implements OnInit {
  newChambre = new Chambre();
  hotels!: Hotel[];
  newIdHotel!: number;

  constructor(
    private chambreService: ChambreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.chambreService.listeHotels().subscribe({
      next: (data) => {
        console.log('Réponse des hôtels :', data);

        if (Array.isArray(data)) {
          this.hotels = data;
        } else if (data?._embedded?.hotels) {
          this.hotels = data._embedded.hotels;
        } else {
          console.error('Format de réponse inattendu :', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des hôtels :', err);
      }
    });
  }


  addChambre(): void {
    const hotel = this.hotels.find((h) => h.idHotel == this.newIdHotel);

    if (!hotel) {
      console.error('Veuillez sélectionner un hôtel.');
      return;
    }

    this.newChambre.hotel = hotel;

    this.chambreService.ajouterChambre(this.newChambre).subscribe({
      next: () => {
        this.router.navigate(['chambres']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de la chambre :", err);
      },
    });
  }
}
