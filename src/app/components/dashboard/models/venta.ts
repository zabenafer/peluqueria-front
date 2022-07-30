import { Cliente } from "./cliente";

export class Venta {

  id_venta: number;
  cod_venta: number;
  monto_total: number;
  descripcion: string;

  cliente: Cliente = new Cliente;

}
