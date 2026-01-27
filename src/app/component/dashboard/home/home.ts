import { inject, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TicketService } from '../../../service/ticket.service';
import { AuthService } from '../../../service/auth.service';
import { Ticket } from '../../../model/ticket';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);

  usuarioActual: Usuario | null = null;
  tickets: Ticket[] = [];
  cargando: boolean = true;

  ngOnInit(): void {
    this.usuarioActual = this.authService.obtenerUsuarioActual();

    if (this.usuarioActual) {
      this.cargarTickets(this.usuarioActual.id);
    }
  }
  cargarTickets(usuarioId: number) {
    this.ticketService.getTickets(usuarioId).subscribe({
      next: (data) => {
        this.tickets = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar tickets', err);
        this.cargando = false;
      }
    });
  }

  getBadgeClass(prioridad: string): string {
    switch (prioridad) {
      case 'ALTA': return 'bg-danger';
      case 'MEDIA': return 'bg-warning text-dark';
      case 'BAJA': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}
