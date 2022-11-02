import { Producto } from "./producto";
import { Venta } from "./venta";

export class DetalleVenta {

  id_detalle_venta: number;
  cantidad: number;
  precio: number;

  producto: Producto = new Producto;
  id_venta: number;

}
