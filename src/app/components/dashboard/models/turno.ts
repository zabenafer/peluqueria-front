import { Cliente } from './cliente';
import { Tratamiento } from './tratamiento';
export class Turno {

  id_turno: number;
  fecha_turno: Date;
  precio: number;
  descripcion: string;
  tratamiento: Tratamiento = new Tratamiento;
  cliente: Cliente = new Cliente;

}
