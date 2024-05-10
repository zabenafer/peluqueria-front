import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    this.form = this.formBuilder.group({
      id_tratamiento: [''],
      nombre:['', [Validators.required]],
      precio:['', [Validators.required]],
      descripcion:['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.form.patchValue(this.data);

    if (this.data.id_tratamiento >= 0) {
      this.nombreComponente = "Modificar Tratamiento"
    } else {
      this.nombreComponente = "Agregar Tratamiento"
    }
  }
  onCreate(): void {
    console.log(this.data);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      console.log("ENTRO FORM VALIDO");
      if (this.data != null && this.data.id_tratamiento > 0) {
        console.log("POR HACER EL UPDATE");
        console.log(this.form.value);
        this.tratamientoService.update(this.form.value).subscribe(
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
        this.tratamientoService.add(this.form.value).subscribe(
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
  }

  onClear() {
    this.toastr.success('Cliente Creado con exito!', 'OK', { timeOut: 3000 });
  }

  onClose() {
    this.dialogRef.close();
  }



}
