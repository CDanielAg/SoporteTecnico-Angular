export interface Usuario {
  id: number;
  usuario: string;
  email: string;
  nombre: string;
  rol: 'ADMIN' | 'TECNICO' | 'EMPLEADO';
}