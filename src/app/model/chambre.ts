import { Hotel } from './hotel';

export class Chambre {
  idChambre!: number;
  numeroChambre?: string;
  typeChambre?: string;
  prixNuit?: number;
  dateAjout?: Date;
  hotel!: Hotel;
}
