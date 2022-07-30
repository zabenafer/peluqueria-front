import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";

export class Producto {

  id_producto: number;
  nombre: string;
  cantidad: number;
  precio: number;
  descripcion: string;

  proveedor: Proveedor = new Proveedor;
  categoria: Categoria = new Categoria;

}
