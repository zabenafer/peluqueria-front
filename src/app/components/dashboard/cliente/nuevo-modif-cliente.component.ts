import { Cliente } from './../models/cliente';
import { ClienteService } from '../service/cliente.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalidadService } from '../service/localidad.service';
import { ProvinciaService } from '../service/provincia.service';
import { Provincia } from '../models/provincia';
import { Localidad } from '../models/localidad';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-modif-cliente.component.html',
  styleUrls: ['./nuevo-modif-cliente.component.css'],
})
export class NuevoModifClienteComponent implements OnInit, OnDestroy {
  cliente: Cliente;
  form: FormGroup;
  localidades: Localidad[];
  provincias: Provincia[];
  nombreComponente: String;
  provinciaFiltradas: Provincia[] = [];
  localidadesFiltradas: Localidad[] = [];
  filtroProvincia = new FormControl('');
  filtroLocalidad = new FormControl('');

  private filtroLocalidadSub: any;

  constructor(
    public clienteService: ClienteService,
    public localidadService: LocalidadService,
    public provinciaService: ProvinciaService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<NuevoModifClienteComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente) {
    this.form = this.formBuilder.group({
      id_cliente: [''],
      nombre:['', [Validators.required]],
      apellido:['', [Validators.required]],
      celular:['', []],
      email:['', []],//Validators.required, Validators.email
      localidad:['', [Validators.required]],
      provincia:[null, [Validators.required]]
    });
  }
  
ngOnInit(): void {
    this.form.patchValue({
      id_cliente: this.data.id_cliente,
      nombre: this.data.nombre,
      apellido: this.data.apellido,
      celular: this.data.celular,
      email: this.data.email
    });
    this.filtroProvincia.setValue(this.data.localidad.provincia.nombre);

    this.nombreComponente = this.data.id_cliente >= 0 ? 'Modificar Cliente' : 'Agregar Cliente';
    this.provinciaService.lista().subscribe(
      (resp) => {
        this.provincias = resp;
        this.provinciaFiltradas = resp;

        // Filtrado dinámico
        this.filtroProvincia.valueChanges.subscribe((valor: string) => {
          const filtro = valor?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || '';
          this.provinciaFiltradas = this.provincias.filter(prov =>
            prov.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filtro)
          );
        });

        const idProvincia = this.data.localidad?.provincia?.id_provincia;
        if (idProvincia > 0) {
          this.localidadService.findLocalidadByProvincia(idProvincia).subscribe((dataLocal) => {
            this.localidades = dataLocal;

            this.filtroLocalidad.valueChanges.subscribe((valor: string) => {
              const filtro = valor?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || '';
              this.localidadesFiltradas = this.localidades.filter(loc =>
                loc.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filtro)
              );
            });

            // ✅ Ahora que provincias y localidades están cargadas, podés setear todo el formulario
            this.form.patchValue({
              provincia: idProvincia,
              localidad: this.localidades.find(l => l.id_localidad === this.data.localidad.id_localidad)
            });
            // ✅ Mostramos la localidad en el input de búsqueda
            this.filtroLocalidad.setValue(this.data.localidad.nombre);
          });
        }
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', { timeOut: 3000 });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.filtroLocalidadSub) this.filtroLocalidadSub.unsubscribe();
  }

  getErrorMessage() {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('required')) return 'Ingrese un email válido';
    return emailControl?.hasError('email') ? 'Email inválido' : '';
  }

  cargarLocalidadPorProvinciaId(idProvincia: any) {
    this.localidadService.findLocalidadByProvincia(idProvincia.value).subscribe(
      (resp) => {
        this.localidades = resp;
        this.localidadesFiltradas = resp;
        this.filtroLocalidad.setValue('');

        // 👇 Cancelamos suscripción anterior si la hubiera
        if (this.filtroLocalidadSub) this.filtroLocalidadSub.unsubscribe();

        // ✅ Nueva suscripción
        this.filtroLocalidadSub = this.filtroLocalidad.valueChanges.subscribe((valor: string) => {
          const filtro = valor?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || '';
          this.localidadesFiltradas = this.localidades.filter(loc =>
            loc.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filtro)
          );
        });
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
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
      return;
    }

    const action = this.data?.id_cliente > 0
      ? this.clienteService.update(this.form.value)
      : this.clienteService.add(this.form.value);

    action.subscribe(
      () => {
        this.clienteService.lista().subscribe((data) => {
          this.clienteService.clienteActualizar.next(data);
          this.toastr.success(`Cliente ${this.data.id_cliente > 0 ? 'modificado' : 'creado'} con éxito`, 'OK', { timeOut: 3000 });
          this.dialogRef.close();
        });
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  onClear() {
    this.toastr.success('Cliente Creado con exito!', 'OK', { timeOut: 3000 });
  }

  onClose() {
    this.dialogRef.close();
  }

  onProvinciaOpened(opened: boolean, inputElement: HTMLInputElement) {
    if (opened) {
      setTimeout(() => inputElement.focus());
    }
  }
  onLocalidadOpened(opened: boolean, inputElement: HTMLInputElement) {
    if (opened) {
      setTimeout(() => inputElement.focus());
    }
  } 

  onProvinciaSeleccionada(nombreProvincia: string) {
    const provinciaSeleccionada = this.provincias.find(p =>
      p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      nombreProvincia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    if (provinciaSeleccionada) {
      this.form.patchValue({ provincia: provinciaSeleccionada.id_provincia });
      this.cargarLocalidadPorProvinciaId({ value: provinciaSeleccionada.id_provincia });
    }
  }
  onLocalidadSeleccionada(nombreLocalidad: string) {
    const localidadSeleccionada = this.localidades.find(l =>
      l.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      nombreLocalidad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    if (localidadSeleccionada) {
      this.form.patchValue({ localidad: localidadSeleccionada });
    }
  }
}
