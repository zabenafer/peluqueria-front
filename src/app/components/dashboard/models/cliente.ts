import { Localidad } from './localidad';

export class Cliente {

  id_cliente: number;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  localidad: Localidad = new Localidad;

}
