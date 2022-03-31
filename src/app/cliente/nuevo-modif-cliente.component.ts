import { Cliente } from '../models/cliente';
import { ClienteService } from '../service/cliente.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalidadService } from '../service/localidad.service';
import { ProvinciaService } from '../service/provincia.service';
import { Provincia } from '../models/provincia';
import { Localidad } from '../models/localidad';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-modif-cliente.component.html',
  styleUrls: ['./nuevo-modif-cliente.component.css'],
})
export class NuevoModifClienteComponent implements OnInit {
  cliente: Cliente;
  form!: FormGroup;
  localidades: Localidad[];
  provincias: Provincia[];
  idProvincia: any;
  nombreComponente: String;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public clienteService: ClienteService,
    public localidadService: LocalidadService,
    public provinciaService: ProvinciaService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<NuevoModifClienteComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {}

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cliente.id_cliente = this.data.id_cliente;
    this.cliente.nombre = this.data.nombre;
    this.cliente.apellido = this.data.apellido;
    this.cliente.celular = this.data.celular;
    this.cliente.email = this.data.email;
    this.cliente.localidad.id_localidad = this.data.localidad.id_localidad;
    this.cliente.localidad.provincia = this.data.localidad.provincia;

    if (this.data.id_cliente >= 0) {
      this.nombreComponente = "Modificar Cliente"
    } else {
      this.nombreComponente = "Agregar Cliente"
    }

    this.provinciaService.lista().subscribe(
      (resp) => {
        this.provincias = resp;
        if (this.cliente.localidad.provincia.id_provincia > 0) {
          this.localidadService.findLocalidadByProvincia(this.cliente.localidad.provincia.id_provincia).subscribe( (dataLocal) => {
            this.localidades = dataLocal;
          })
        }
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', { timeOut: 3000 });
      }
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email valido';
    }

    return this.email.hasError('email') ? 'Email Invalido' : '';
  }

  cargarLocalidadPorProvinciaId(idProvincia: any) {
    this.cliente.localidad.nombre = '';
    this.localidadService.findLocalidadByProvincia(idProvincia.value).subscribe(
      (resp) => {
        this.localidades = resp;
      },
      (err) => {
        this.toastr.error(
          err.error.mensaje,
          'Fail al buscar las localidades de la provincia',
          { timeOut: 3000 }
        );
      }
    );
  }
  onCreate(): void {

    if (this.cliente != null && this.cliente.id_cliente > 0) {
      this.clienteService.update(this.cliente).subscribe(
        () => {
          return this.clienteService.lista().subscribe((data) => {
            this.clienteService.clienteActualizar.next(data);
            this.toastr.success('Cliente modificado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.router.navigate(['/']);
            this.dialogRef.close();
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.clienteService.add(this.cliente).subscribe(
        () => {
          this.clienteService.lista().subscribe((data) => {
            this.clienteService.clienteActualizar.next(data);
            this.toastr.success('Cliente Creado con exito!', 'OK', {
              timeOut: 3000,
            });
            this.router.navigate(['/']);
            this.dialogRef.close();
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
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
