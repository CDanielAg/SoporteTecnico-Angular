import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { AuthService } from '../../../service/auth.service';
import { TicketService } from '../../../service/ticket.service';

@Component({
  selector: 'app-modal-asignacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-asignacion.html'
})
export class ModalAsignacion implements OnInit {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);

  @Input() ticketId: number | null = null;
  
  @Output() asignacionCompletada = new EventEmitter<void>();

  tecnicos: Usuario[] = [];
  tecnicoSeleccionado: number | null = null;
  guardando: boolean = false;

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  cargarTecnicos() {
    this.authService.getTecnicos().subscribe({
      next: (data) => this.tecnicos = data,
      error: (err) => console.error('Error cargando técnicos', err)
    });
  }

  confirmar() {
    if (this.ticketId && this.tecnicoSeleccionado) {
      this.guardando = true;
      this.ticketService.asignarTecnico(this.ticketId, this.tecnicoSeleccionado).subscribe({
        next: () => {
          alert('Técnico asignado correctamente.');
          this.guardando = false;
          this.tecnicoSeleccionado = null; 
          this.asignacionCompletada.emit(); 
        },
        error: () => {
          alert('Error al asignar.');
          this.guardando = false;
        }
      });
    }
  }
}