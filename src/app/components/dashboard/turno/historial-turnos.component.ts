import { EliminarComponent } from './../eliminar/eliminar.component';
import { Cliente } from './../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Turno } from '../models/turno';
import { TurnoService } from '../service/turno.service';
import { ClienteService } from '../service/cliente.service';
import { NuevoModifTurnoComponent } from './nuevo-modif-turno.component';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.css']
})
export class HistorialTurnosComponent implements OnInit {

  id!: number;
  data: Turno[] = [];
  resultsLength = 0;
  cliente: Cliente;

  constructor(private turnoService: TurnoService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: ActivatedRoute) { }

  public displayedColumns: any[] = ['fechaTurno', 'tratamiento.nombre', 'turno.descripcion', 'precio', 'acciones'];
  public dataSource = new MatTableDataSource<Turno>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => { this.id = params['id'] })
    this.clienteService.findCliente(this.id).subscribe(data => {
      this.cliente = data;
    })

    this.turnoService.turnoActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.cargarTurnos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarTurnos(): void {
    this.turnoService.findTurnoXCliente(this.id).subscribe(
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
  onEdit(turno: Turno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = turno;
    this.dialog.open(NuevoModifTurnoComponent, dialogConfig);
  }

  onDelete(id:number, turno: Turno){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data ="de " + turno.cliente.nombre +" "+ turno.cliente.apellido +" - Fecha "+ turno.fecha_turno;
    dialogConfig.id = "Turno";
    this.dialog.open(EliminarComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result == true) {
        console.log(id);
        this.turnoService.delete(id).subscribe(
          data => {
            console.log(result);
            this.toastr.success('Turno Eliminado con exito!', 'OK', { timeOut: 3000 });
            this.cargarTurnos();
          })
      } else {
        console.log("no queria eliminar");
      }
    });
  }

}
