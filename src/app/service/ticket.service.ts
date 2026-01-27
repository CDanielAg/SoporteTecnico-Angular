import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../model/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  getTickets(usuarioId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}?usuarioId=${usuarioId}`);
  }
  
}
