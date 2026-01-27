import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tickets'; 

  getTickets(usuarioId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  changeTicketStatus(ticketId: number, nuevoEstado: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}/${ticketId}/estado`, { estado: nuevoEstado });
  }
}