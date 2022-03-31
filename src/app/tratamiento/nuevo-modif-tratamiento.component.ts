import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tratamiento } from '../models/tratamiento';
import { TratamientoService } from '../service/tratamiento.service';

@Component({
  selector: 'app-nuevo-modif-tratamiento',
  templateUrl: './nuevo-modif-tratamiento.component.html',
  styleUrls: ['./nuevo-modif-tratamiento.component.css']
})
export class NuevoModifTratamientoComponent implements OnInit {

  tratamiento: Tratamiento;
  form!: FormGroup;
  nombreComponente: String;

  constructor(
    public tratamientoService: TratamientoService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<NuevoModifTratamientoComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento
  ) { }

  ngOnInit(): void {
    this.tratamiento = new Tratamiento();
    this.tratamiento.id_tratamiento = this.data.id_tratamiento;
    this.tratamiento.nombre = this.data.nombre;
    this.tratamiento.precio = this.data.precio;
    this.tratamiento.descripcion = this.data.descripcion;

    if (this.data.id_tratamiento >= 0) {
      this.nombreComponente = "Modificar Tratamiento"
    } else {
      this.nombreComponente = "Agregar Tratamiento"
    }
  }
  onCreate(): void {
    console.log(this.tratamiento);

    if (this.tratamiento != null && this.tratamiento.id_tratamiento > 0) {
      this.tratamientoService.update(this.tratamiento).subscribe(
        () => {
          return this.tratamientoService.lista().subscribe((data) => {
            this.tratamientoService.tratamientoActualizar.next(data);
            this.toastr.success('Tratamiento Modificado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.dialogRef.close();
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.tratamientoService.add(this.tratamiento).subscribe(
        () => {
          this.tratamientoService.lista().subscribe((data) => {
            this.tratamientoService.tratamientoActualizar.next(data);
            this.toastr.success('Tratamiento Creado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.dialogRef.close();
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Fail', { timeOut: 3000 });
        }
      );
    }
  }

  onClear() {
    this.toastr.success('Cliente Creado con exito!', 'OK', { timeOut: 3000 });
  }

  onClose() {
    this.dialogRef.close();
  }



}
