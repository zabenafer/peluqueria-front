import { Venta } from './../models/venta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoModifVentaComponent } from './nuevo-modif-venta.component';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styleUrls: ['./lista-venta.component.css']
})
export class ListaVentaComponent implements OnInit {

  data: Venta[] = [];
  public displayedColumns: any[] = ['cod_venta', 'cliente.nombre', 'descripcion','monto_total','detalleVenta', 'acciones'];
  public dataSource = new MatTableDataSource<Venta>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;

  constructor(private ventaService: VentaService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.ventaService.ventaActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.cargarVentas();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarVentas(): void {
    this.ventaService.lista().subscribe(
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

  onAdd(venta?: Venta) {
    let product = (venta != null) ? venta: new Venta();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = product;
    this.dialog.open(NuevoModifVentaComponent, dialogConfig);
  }

  onEdit(venta: Venta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = venta;
    this.dialog.open(NuevoModifVentaComponent, dialogConfig);
  }

  onDelete(id:number){
    console.log(id);
    this.ventaService.delete(id).subscribe(
      data => {
        this.toastr.success("Venta eliminado con Exito!","OK", { timeOut: 3000 });
        this.cargarVentas();
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
