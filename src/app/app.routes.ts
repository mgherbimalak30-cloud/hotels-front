import { Routes } from '@angular/router';
import { ChambresComponent } from './chambres/chambres.component';
import { AddChambreComponent } from './add-chambre/add-chambre.component';
import { UpdateChambreComponent } from './update-chambre/update-chambre.component';
import { RechercheParHotel } from './recherche-par-hotel/recherche-par-hotel';
import { RechercheParNumero } from './recherche-par-numero/recherche-par-numero';
import { ListeChambres } from './liste-chambres/liste-chambres';
import { Login } from './login/login';
export const routes: Routes = [
  { path: 'chambres', component: ChambresComponent },
  { path: 'add-chambre', component: AddChambreComponent },
  { path: 'updateChambre/:id', component: UpdateChambreComponent },
  { path: '', redirectTo: 'chambres', pathMatch: 'full' },
  { path: 'rechercheParHotel', component: RechercheParHotel },
  { path: 'rechercheParNumero', component: RechercheParNumero },
  { path: 'listeChambres', component: ListeChambres },
  { path: 'login', component: Login },
];
