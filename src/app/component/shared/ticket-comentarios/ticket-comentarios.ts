import { Component, inject, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentarioService } from '../../../service/comentario.service';
import { AuthService } from '../../../service/auth.service';
import { ComentarioResponse } from '../../../model/comentario-response';
import { ComentarioRequest } from '../../../model/comentario-request';

@Component({
  selector: 'app-ticket-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './ticket-comentarios.html'
})
export class TicketComentarios implements OnChanges {
  private comentarioService = inject(ComentarioService);
  private authService = inject(AuthService);
  private cd = inject(ChangeDetectorRef);

  @Input() ticketId!: number;
  @Input() estadoTicket: string = '';

  comentarios: ComentarioResponse[] = [];
  nuevoContenido: string = '';
  cargando: boolean = false;
  enviando: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketId'] && this.ticketId) {
      this.cargarComentarios();
    }
  }

  cargarComentarios() {
    this.cargando = true;
    this.comentarioService.getComentarios(this.ticketId).subscribe({
      next: (data) => {
        this.comentarios = data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  enviar() {
    const usuario = this.authService.obtenerUsuarioActual();
    if (!this.nuevoContenido.trim() || !usuario) return;

    this.enviando = true;
    
    const request: ComentarioRequest = {
      content: this.nuevoContenido,
      ticketId: this.ticketId,
      usuarioId: usuario.id
    };

    this.comentarioService.agregar(request).subscribe({
      next: (nuevoComentario) => {
        this.comentarios.push(nuevoComentario);
        this.nuevoContenido = '';
        this.enviando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al enviar comentario');
        this.enviando = false;
        this.cd.detectChanges();
      }
    });
  }
}