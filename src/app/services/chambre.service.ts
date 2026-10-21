import { Injectable } from '@angular/core';
import { Chambre } from '../model/chambre';
import { Hotel } from '../model/hotel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HotelWrapper } from '../model/hotel-wrapper';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChambreService {
  apiURL: string = 'http://localhost:8081/hotels/api/chambres';
  apiURLHotel: string = 'http://localhost:8081/hotels/api/hotels';

  constructor(private http: HttpClient) {}

  listeChambres(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  ajouterChambre(c: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(this.apiURL, c, httpOptions);
  }

  supprimerChambre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  consulterChambre(id: number): Observable<Chambre> {
    return this.http.get<Chambre>(`${this.apiURL}/${id}`);
  }

  updateChambre(c: Chambre): Observable<Chambre> {
    return this.http.put<Chambre>(this.apiURL, c, httpOptions);
  }

  listeHotels(): Observable<HotelWrapper> {
    return this.http.get<HotelWrapper>(this.apiURLHotel);
  }

  consulterHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiURLHotel}/${id}`);
  }
  rechercherParNumero(numero: string): Observable<Chambre[]> {
    const url = `${this.apiURL}/numero/${encodeURIComponent(numero)}`;
    return this.http.get<Chambre[]>(url);
  }
}
