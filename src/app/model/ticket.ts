import { Usuario } from "./usuario";

export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  estado: 'ABIERTO' | 'EN_PROGRESO' | 'RESUELTO' | 'CERRADO';
  createdAt: string; 
  creador: Usuario;
  tecnicoAsignado?: Usuario;
}