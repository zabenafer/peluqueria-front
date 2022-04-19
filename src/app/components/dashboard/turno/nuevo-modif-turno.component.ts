import { Component, Inject, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Tratamiento } from '../models/tratamiento';
import { TurnoService } from '../service/turno.service';
import { ClienteService } from '../service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TratamientoService } from '../service/tratamiento.service';
import { Turno } from '../models/turno';

@Component({
  selector: 'app-nuevo-modif-turno',
  templateUrl: './nuevo-modif-turno.component.html',
  styleUrls: ['./nuevo-modif-turno.component.css']
})
export class NuevoModifTurnoComponent implements OnInit {

  turno: Turno;
  tratamientos: Tratamiento[];
  clientes: Cliente[];
  nombreComponente: String;

  constructor(
    public turnoService: TurnoService,
    public tratamientoService: TratamientoService,
    public clienteService: ClienteService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NuevoModifTurnoComponent>,
    public formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Turno) { }

  ngOnInit(): void {
    this.turno = new Turno();
    this.turno.id_turno = this.data.id_turno;
    this.turno.fecha_turno = this.data.fecha_turno;
    this.turno.precio = this.data.precio;
    this.turno.descripcion = this.data.descripcion;
    this.turno.tratamiento.id_tratamiento = this.data.tratamiento.id_tratamiento;
    this.turno.tratamiento.nombre = this.data.tratamiento.nombre;
    this.turno.cliente = this.data.cliente;

    if (this.data.id_turno >= 0) {
      this.nombreComponente = "Modificar Turno"
    } else {
      this.nombreComponente = "Agregar Turno"
    }

    this.tratamientoService.lista().subscribe(
      (data) => {
        this.tratamientos = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
    this.clienteService.lista().subscribe(
      (data) => {
        this.clientes = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
  }
  idTratamiento(idTratamiento: any) {
    console.log(idTratamiento.value);
    // this.localidadService.findLocalidadByProvincia(idProvincia.value).subscribe(
    //   (resp) => {
    //     this.localidades = resp;
    //   },
    //   (err) => {
    //     this.toastr.error(
    //       err.error.mensaje,
    //       'Fail al buscar las localidades de la provincia',
    //       { timeOut: 3000 }
    //     );
    //   }
    // );
  }

  onCreate(): void {
    if (this.turno != null && this.turno.id_turno > 0) {
      this.turnoService.update(this.turno).subscribe(
        () => {
          return this.turnoService.lista().subscribe((data) => {
            this.turnoService.turnoActualizar.next(data);
            this.toastr.success('Turno modificado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.dialogRef.close();
            this.router.navigate(['/dashboard/turnos']);
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.turnoService.add(this.turno).subscribe(
        () => {
          this.turnoService.lista().subscribe((data) => {
            this.turnoService.turnoActualizar.next(data);
            this.toastr.success('Turno Creado con exito!', 'OK', {
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
