import { NuevoModifProductoComponent } from './nuevo-modif-producto.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  data: Producto[] = [];
  public displayedColumns: any[] = ['id_producto','nombre', 'precio', 'cantidad','categoria.nombre', 'proveedor.nombre', 'acciones'];
  public dataSource = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;

  constructor(private productoService: ProductoService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.productoService.productoActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data)
        console.log(data.length)
      },
      err => {
        console.log(err);
      }
    );
  }

  onAdd(producto?: Producto) {
    let product = (producto != null) ? producto: new Producto();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = product;
    this.dialog.open(NuevoModifProductoComponent, dialogConfig);
  }

  onEdit(producto: Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = producto;
    this.dialog.open(NuevoModifProductoComponent, dialogConfig);
  }

  onDelete(id:number){
    console.log(id);
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success("Producto eliminado con Exito!","OK", { timeOut: 3000 });
        this.cargarProductos();
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
