import { Component, Inject, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Tratamiento } from '../models/tratamiento';
import { TurnoService } from '../service/turno.service';
import { ClienteService } from '../service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  tratamientos: Tratamiento[];
  clientes: Cliente[];
  nombreComponente: String;
  clienteFiltrados: Cliente[] = [];
  filtroCliente = new FormControl('');

  constructor(
    public turnoService: TurnoService,
    public tratamientoService: TratamientoService,
    public clienteService: ClienteService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NuevoModifTurnoComponent>,
    public formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Turno) {     
      this.form = this.formBuilder.group({
          id_turno: [''],
          fecha_turno:['', [Validators.required]],
          precio:['', [Validators.required]],
          tratamiento:['', []],
          cliente:[''],//Validators.required, Validators.email
          descripcion:['', [Validators.required]]
        }); }

  ngOnInit(): void {
    this.form.patchValue(this.data);

    if (this.data.id_turno >= 0) {
      this.nombreComponente = "Modificar Turno"
    } else {
      this.nombreComponente = "Agregar Turno"
    }

    this.tratamientoService.lista().subscribe(
      (resp) => {
        this.tratamientos = resp;
        this.form.patchValue({
          tratamiento: this.data.tratamiento.id_tratamiento
        });
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
    this.clienteService.lista().subscribe(
      (resp) => {
        this.clientes = resp;
        this.clienteFiltrados = resp;

        // Filtrado dinámico
        this.filtroCliente.valueChanges.subscribe((texto: string) => {
          this.clienteFiltrados = this.clientes.filter(c =>
            c.nombre.toLowerCase().includes(texto.toLowerCase()) ||
            c.apellido.toLowerCase().includes(texto.toLowerCase())
          );
        });

        this.form.patchValue({
          cliente: this.data.cliente.id_cliente
        });
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    )
  }
  idTratamiento(idTratamiento: any) {
    console.log(idTratamiento.value);
  }

  onCreate(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      const payload = {
        ...this.form.value,
        tratamiento: { id_tratamiento: this.form.value.tratamiento },
        cliente: { id_cliente: this.form.value.cliente }
      };
      if (this.data != null && this.data.id_turno > 0) {
        this.turnoService.update(payload).subscribe(
          () => {
            return this.turnoService.lista().subscribe((data) => {
              this.turnoService.turnoActualizar.next(data);
              this.toastr.success('Turno modificado con exito!', 'OK', {
                timeOut: 3000,
              });
              this.dialogRef.close();
              this.router.navigate(['/dashboard/servicios']);
            });
          },
          (err) => {
            this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
          }
        );
      } else {
        this.turnoService.add(payload).subscribe(
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

  onClienteOpened(opened: boolean, inputElement: HTMLInputElement) {
    if (opened) {
      setTimeout(() => inputElement.focus());
    }
  }  
}
