import { NuevoModifTurnoComponent } from './nuevo-modif-turno.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TurnoService } from '../service/turno.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Turno } from '../models/turno';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {

  data: Turno[] = [];
  resultsLength = 0;

  constructor(private turnoService: TurnoService,
     private dialog: MatDialog,
     private toastr: ToastrService,
     private router: Router) { }

  public displayedColumns: any[] = ['fechaTurno','cliente.nombre', 'cliente.apellido', 'tratamiento.nombre', 'turno.descripcion', 'precio', 'acciones'];
  public dataSource = new MatTableDataSource<Turno>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

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
    this.turnoService.lista().subscribe(
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

  onAdd(turno?: Turno) {
    let turno1 = (turno != null) ? turno: new Turno();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = turno1;
    this.dialog.open(NuevoModifTurnoComponent, dialogConfig);
  }

  onEdit(turno: Turno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = turno;
    this.dialog.open(NuevoModifTurnoComponent, dialogConfig);
  }

  onDelete(id:number){
    console.log(id);
    this.turnoService.delete(id).subscribe(
      data => {
        this.toastr.success("Turno eliminado con Exito!","OK", { timeOut: 3000 });
        this.cargarTurnos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al eliminar el Turno', { timeOut: 3000 });
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
