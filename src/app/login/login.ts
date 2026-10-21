import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = new User();
  erreur = 0;

  onLoggedin(): void {
    console.log(this.user);
  }
}
