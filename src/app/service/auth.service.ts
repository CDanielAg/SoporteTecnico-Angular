import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:8080/api/auth';

  login(credentials: LoginRequest): Observable<Usuario>{
   return this.http.post<Usuario>(`${this.baseUrl}/login`, credentials);
  }

  guardarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuarioActual(): Usuario | null {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  estaLogueado(): boolean {
    return this.obtenerUsuarioActual() !== null;
  }

  getTecnicos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/tecnicos`);
  }
}
