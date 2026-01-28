import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../../../service/auth.service';
import { TicketService } from '../../../service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Usuario } from '../../../model/usuario';
import { ModalAsignacion } from '../../shared/modal-asignacion/modal-asignacion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, ModalAsignacion], 
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  usuarioActual: Usuario | null = null;
  tickets: Ticket[] = [];
  cargando: boolean = true;
  ticketSeleccionadoId: number | null = null;

  ngOnInit(): void {
    this.usuarioActual = this.authService.obtenerUsuarioActual();

    if (this.usuarioActual && this.usuarioActual.id) {
      this.cargarTickets(this.usuarioActual.id);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cargarTickets(usuarioId: number) {
    this.ticketService.getTickets(usuarioId).subscribe({
      next: (data) => {
        this.tickets = data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  resolverTicket(ticket: Ticket) {
    if (!confirm(`¿Confirmas que has resuelto el ticket #${ticket.id}?`)) {
      return;
    }
    this.actualizarEstado(ticket, 'RESUELTO', 'Ticket marcado como resuelto.');
  }

  cerrarTicket(ticket: Ticket) {
    if (!confirm(`¿Aceptas la solución dada y cierras el ticket #${ticket.id} definitivamente?`)) {
      return;
    }
    this.actualizarEstado(ticket, 'CERRADO', '¡Ticket cerrado exitosamente!');
  }

  private actualizarEstado(ticket: Ticket, nuevoEstado: 'RESUELTO' | 'CERRADO', mensajeExito: string) {
    this.ticketService.changeTicketStatus(ticket.id, nuevoEstado).subscribe({
      next: (ticketActualizado) => {
        this.tickets = this.tickets.map(t => 
          t.id === ticketActualizado.id ? ticketActualizado : t
        );
        alert(mensajeExito);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        alert('Ocurrió un error al actualizar el ticket.');
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

  abrirModalAsignacion(id: number) {
    this.ticketSeleccionadoId = id;
  }

  alTerminarAsignacion() {
    if (this.usuarioActual) {
      this.cargarTickets(this.usuarioActual.id);
    }
  }
}