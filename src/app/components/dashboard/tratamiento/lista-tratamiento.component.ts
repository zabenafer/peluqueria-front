import { Tratamiento } from './../models/tratamiento';
import { NuevoModifTratamientoComponent } from './nuevo-modif-tratamiento.component';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TratamientoService } from '../service/tratamiento.service';
import { EliminarComponent } from '../eliminar/eliminar.component';

@Component({
  selector: 'app-lista-tratamiento',
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.css']
})
export class ListaTratamientoComponent implements OnInit {

  data: Tratamiento[] = [];
  public displayedColumns: any[] = ['id_tratamiento','nombre', 'descripcion', 'precio', 'acciones'];
  public dataSource = new MatTableDataSource<Tratamiento>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;

  constructor(private tratamientoService: TratamientoService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.tratamientoService.tratamientoActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.cargarTratamientos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarTratamientos(): void {
    this.tratamientoService.lista().subscribe(
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

  onAdd(tratamiento?: Tratamiento) {
    let tratamient = (tratamiento != null) ? tratamiento: new Tratamiento();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = tratamient;
    this.dialog.open(NuevoModifTratamientoComponent, dialogConfig);
  }

  onEdit(tratamiento: Tratamiento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = tratamiento;
    this.dialog.open(NuevoModifTratamientoComponent, dialogConfig);
  }

  onDelete(id:number, tratamiento: Tratamiento){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = tratamiento.nombre;
    dialogConfig.id = "Tratamiento";
    this.dialog.open(EliminarComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result == true) {
        console.log(result);
        this.toastr.success('Tratamiento Eliminado con exito!', 'OK', { timeOut: 3000 });
      } else {

        console.log("no queria eliminar");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.precio).reduce((acc, value) => acc + value, 0);
  }

}
