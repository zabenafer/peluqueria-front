import { Producto } from './../models/producto';
import { MatTable } from '@angular/material/table';
import { DetalleVenta } from './../models/detalleVenta';
import { Cliente } from './../models/cliente';
import { Venta } from './../models/venta';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { VentaService } from '../service/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-nuevo-modif-venta',
  templateUrl: './nuevo-modif-venta.component.html',
  styleUrls: ['./nuevo-modif-venta.component.css']
})
export class NuevoModifVentaComponent implements OnInit {

  public venta: Venta;
  public detalleVenta: DetalleVenta[];
  cliente: Cliente;
  clientes: Cliente[];
  productos: Producto[];
  producto: Producto;
  idCliente: any;
  idProducto: any;
  cantStock: any;

  @ViewChild(MatTable) table: MatTable<DetalleVenta>;

  public detalleForm = this.formBuilder.group({
    cantidad: [0, Validators.required],
    precio: [0, Validators.required],
    id_producto: [0, Validators.required],
    cantStock: [],
    nombreProducto: [""]
  })

  public displayedColumns: any[] = ['nombreProducto' ,'precio', 'cantidad',"acciones"];

  constructor(
    public formBuilder: FormBuilder,
    public ventaService: VentaService,
    public clienteService: ClienteService,
    public productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router) {

      this.detalleVenta = [];

    }

  ngOnInit(): void {

    const detalleForm = new FormGroup({
      cantidad: new FormControl(),
      nombreProducto: new FormControl()
    });

    this.venta = new Venta();
    this.cliente = new Cliente();
    this.producto = new Producto();

    this.clienteService.lista().subscribe(
      (data) => {
        console.log(data);
        this.clientes = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )

    this.productoService.lista().subscribe(
      (data) => {
        console.log(data);
        this.productos = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
  }

  cargarDatosCliente(idCliente: any) {
    console.log(idCliente);
    this.clienteService.findCliente(idCliente.value).subscribe(
      (resp) => {
        this.cliente = resp;
        console.log(this.cliente);
      },
      (err) => {
        this.toastr.error(
          err.error.mensaje,
          'Fail al buscar el cliente',
          { timeOut: 3000 }
        );
      }
    );

  }

  cargarDatosProducto(idProducto: any) {
    console.log(idProducto);
    this.productoService.findProducto(idProducto.value).subscribe(
      (resp) => {
        this.producto = resp;
        console.log(this.producto);
        this.cantStock = this.producto.cantidad;
        this.producto.cantidad = 1;
      },
      (err) => {
        this.toastr.error(
          err.error.mensaje,
          'Fail al buscar el producto',
          { timeOut: 3000 }
        );
      }
    );

  }

  addDetalle() {
    console.log(this.detalleForm.value);
    this.detalleForm.setValue({nombreProducto: this.producto.nombre, cantidad: this.producto.cantidad, precio: this.producto.precio, id_producto: this.producto.id_producto, cantStock: this.cantStock});
    console.log(this.detalleForm.value);

    this.detalleVenta.push(this.detalleForm.value);
    this.table.renderRows();
    console.log(this.detalleVenta);
  }

  addVenta() {
    this.venta.cliente = this.cliente;
    this.venta.detalleVenta = this.detalleVenta;

    console.log(this.venta);
    this.ventaService.add(this.venta).subscribe(
      () => {
        this.ventaService.lista().subscribe((data) => {
          this.ventaService.ventaActualizar.next(data);
          this.toastr.success('Venta Creado con exito!', 'OK', {
            timeOut: 3000,
          });
          this.router.navigate(['/dashboard/ventas']);
        });
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
    })
  }

  removeFila() {
    this.detalleVenta.pop();
    this.table.renderRows();
  }

  close() {
    this.router.navigate(['/dashboard/ventas']);
  }
}
