import { Provincia } from './provincia';

export class Localidad {

  id_localidad: number;
  nombre: string;
  provincia: Provincia = new Provincia;

}
