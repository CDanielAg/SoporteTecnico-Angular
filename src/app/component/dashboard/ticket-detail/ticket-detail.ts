import { inject, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../service/ticket.service';
import { AuthService } from '../../../service/auth.service';
import { Location } from '@angular/common';
import { Usuario } from '../../../model/usuario';
import { Ticket } from '../../../model/ticket';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule, DatePipe],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetail implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private location = inject(Location);

  ticket: Ticket | null = null;
  usuarioActual: Usuario | null = null;
  cargando: boolean = true;

  ngOnInit(): void {
    this.usuarioActual = this.authService.obtenerUsuarioActual();
  const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    if (ticketId) {
      this.cargarTicket(ticketId);
    } else {
      this.volver();
    }
  }

  cargarTicket(id: number) {
    this.cargando = true;
    this.ticketService.getTicketById(id).subscribe({
      next: (data) => {
        this.ticket = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar ticket:', err);
        alert('No se pudo cargar el ticket.');
        this.volver();
      }
    });
  }

  resolverTicket() {
    if (!this.ticket) return;
    if (confirm('¿Confirmas que has resuelto este ticket?')) {
      this.actualizarEstado('RESUELTO');
    }
  }

  cerrarTicket() {
    if (!this.ticket) return;
    if (confirm('¿Aceptas la solución y cierras el ticket definitivamente?')) {
      this.actualizarEstado('CERRADO');
    }
  }

  asignarTecnico() {
    alert('Funcionalidad de asignar técnico pendiente de implementar (requiere Modal).');
  }

  private actualizarEstado(nuevoEstado: string) {
    if (!this.ticket) return;
    
    this.ticketService.changeTicketStatus(this.ticket.id, nuevoEstado).subscribe({
      next: (ticketActualizado) => {
        this.ticket = ticketActualizado; 
        alert(`Estado actualizado a: ${nuevoEstado}`);
      },
      error: (err) => alert('Error al actualizar el estado.')
    });
  }

  volver() {
    this.location.back();
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
