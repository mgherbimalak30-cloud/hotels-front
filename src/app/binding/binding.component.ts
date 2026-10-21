import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding',
  imports: [FormsModule],
  templateUrl: './binding.component.html',
  styles: ``,
})
export class BindingComponent {
  titreHotel: string = 'Apprendre le Databinding avec les hôtels';

  nomClient: string = 'Malak';

  changerTitreHotel() {
    this.titreHotel = "Mon nouveau titre d'hôtel";
  }
}
