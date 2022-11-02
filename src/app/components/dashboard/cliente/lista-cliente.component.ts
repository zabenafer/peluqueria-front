import { NuevoModifClienteComponent } from './nuevo-modif-cliente.component';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistorialTurnosComponent } from '../turno/historial-turnos.component';
import { EliminarComponent } from '../eliminar/eliminar.component';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css'],
})


export class ListaClienteComponent implements OnInit {


  data: Cliente[] = [];
  resultsLength = 0;

  constructor(private clienteService: ClienteService,
     private dialog: MatDialog,
     private toastr: ToastrService,
     private router: Router) { }

  public displayedColumns: any[] = ['nombre', 'celular', 'email', 'localidad.nombre', 'localidad.provincia.nombre','historial', 'acciones'];
  public dataSource = new MatTableDataSource<Cliente>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.clienteService.clienteActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.cargarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarClientes(): void {
    this.clienteService.lista().subscribe(
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

  onAdd(cliente?: Cliente) {
    let client = (cliente != null) ? cliente: new Cliente();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = client;
    this.dialog.open(NuevoModifClienteComponent, dialogConfig);
  }

  onEdit(cliente: Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = cliente;
    this.dialog.open(NuevoModifClienteComponent, dialogConfig);
  }

  onDelete(id:number, cliente: Cliente){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = cliente.nombre +" "+ cliente.apellido;
    dialogConfig.id = "Cliente";
    this.dialog.open(EliminarComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result == true) {
        this.toastr.success('Cliente Eliminado con exito!', 'OK', { timeOut: 3000 });
        console.log(result);
      } else {
        console.log("no queria eliminar");
      }
    });



    /*
    console.log(id);
    this.clienteService.delete(id).subscribe(
      data => {
        this.toastr.success("Cliente eliminado con Exito!","OK", { timeOut: 3000 });
        this.cargarClientes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Debe eliminar los turnos del Cliente primero', { timeOut: 3000 });
      }
    )
    */
  }


  verHistorial(cliente: Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = cliente;
    this.dialog.open(HistorialTurnosComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

