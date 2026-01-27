import { inject, Component } from '@angular/core';
import { TicketService } from '../../../service/ticket.service';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketRequest } from '../../../model/ticket-request';

@Component({
  selector: 'app-ticket-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.scss',
})
export class TicketCreate {
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ticketForm: FormGroup;
  enviando: boolean = false;

  constructor() {
    this.ticketForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      prioridad: ['BAJA', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.enviando = true;
      const usuarioActual = this.authService.obtenerUsuarioActual();

      if (usuarioActual && usuarioActual.id) {
        const nuevoTicket: TicketRequest = {
          titulo: this.ticketForm.value.titulo,
          descripcion: this.ticketForm.value.descripcion,
          prioridad: this.ticketForm.value.prioridad,
          creadorId: usuarioActual.id
        };

        this.ticketService.createTicket(nuevoTicket).subscribe({
          next: () => {
            alert('¡Ticket creado con éxito!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Error:', err);
            alert('Error al crear el ticket.');
            this.enviando = false;
          }
        });
      }
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
}
