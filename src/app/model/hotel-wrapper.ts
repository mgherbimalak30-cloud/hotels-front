import { Hotel } from './hotel';

export interface HotelWrapper {
  _embedded: {
    hotels: Hotel[];
  };
}
