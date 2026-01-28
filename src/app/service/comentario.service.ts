import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioRequest } from '../model/comentario-request';
import { ComentarioResponse } from '../model/comentario-response';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/comentarios'; 

  getComentarios(ticketId: number): Observable<ComentarioResponse[]> {
    return this.http.get<ComentarioResponse[]>(`${this.apiUrl}/${ticketId}`);
  }

  agregar(request: ComentarioRequest): Observable<ComentarioResponse> {
    return this.http.post<ComentarioResponse>(this.apiUrl, request);
  }
}