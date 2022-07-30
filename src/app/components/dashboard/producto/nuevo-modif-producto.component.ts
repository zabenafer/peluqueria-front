import { Producto } from './../models/producto';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { Proveedor } from '../models/proveedor';
import { CategoriaService } from '../service/categoria.service';
import { ProductoService } from '../service/producto.service';
import { ProveedorService } from '../service/proveedor.service';

@Component({
  selector: 'app-nuevo-modif-producto',
  templateUrl: './nuevo-modif-producto.component.html',
  styleUrls: ['./nuevo-modif-producto.component.css']
})
export class NuevoModifProductoComponent implements OnInit {

  producto: Producto;
  categorias: Categoria[];
  proveedores: Proveedor[];
  nombreComponente: String;

  constructor(
    public productoService: ProductoService,
    public categoriaService: CategoriaService,
    public proveedorService: ProveedorService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NuevoModifProductoComponent>,
    public formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Producto) { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.id_producto = this.data.id_producto;
    this.producto.nombre = this.data.nombre;
    this.producto.precio = this.data.precio;
    this.producto.descripcion = this.data.descripcion;
    this.producto.cantidad = this.data.cantidad;
    //this.producto.categoria.id_categoria = this.data.categoria.id_categoria;
    //this.producto.tratamiento.nombre = this.data.tratamiento.nombre;
    this.producto.categoria = this.data.categoria;
    this.producto.proveedor = this.data.proveedor;

    if (this.data.id_producto >= 0) {
      this.nombreComponente = "Modificar Producto"
    } else {
      this.nombreComponente = "Agregar Producto"
    }

    this.categoriaService.lista().subscribe(
      (data) => {
        this.categorias = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
    this.proveedorService.lista().subscribe(
      (data) => {
        this.proveedores = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
  }

  onCreate(): void {
    if (this.producto != null && this.producto.id_producto > 0) {
      this.productoService.update(this.producto).subscribe(
        () => {
          return this.productoService.lista().subscribe((data) => {
            this.productoService.productoActualizar.next(data);
            this.toastr.success('Producto modificado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.dialogRef.close();
            this.router.navigate(['/dashboard/productos']);
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.productoService.add(this.producto).subscribe(
        () => {
          this.productoService.lista().subscribe((data) => {
            this.productoService.productoActualizar.next(data);
            this.toastr.success('Producto Creado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.dialogRef.close();
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        }
      );
    }
  }

}
