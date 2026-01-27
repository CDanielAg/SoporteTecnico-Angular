import { inject, Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  public authService = inject(AuthService);

  cerrarSesion() {
    this.authService.logout();
  }

}
