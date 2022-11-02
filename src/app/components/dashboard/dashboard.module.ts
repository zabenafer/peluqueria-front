import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ListaClienteComponent } from './cliente/lista-cliente.component';
import { NuevoModifClienteComponent } from './cliente/nuevo-modif-cliente.component';
import { MenusidevarComponent } from './sidevar/menusidevar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HistorialTurnosComponent } from './turno/historial-turnos.component';
import { ListaTurnosComponent } from './turno/lista-turnos.component';
import { NuevoModifTurnoComponent } from './turno/nuevo-modif-turno.component';
import { NuevoModifTratamientoComponent } from './tratamiento/nuevo-modif-tratamiento.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { NuevoModifProductoComponent } from './producto/nuevo-modif-producto.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ListaVentaComponent } from './venta/lista-venta.component';
import { NuevoModifVentaComponent } from './venta/nuevo-modif-venta.component';
import { DetalleVentaComponent } from './venta/detalle-venta.component';
import { EliminarComponent } from './eliminar/eliminar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenusidevarComponent,
    ListaClienteComponent,
    ListaTurnosComponent,
    ListaTratamientoComponent,
    ListaProductoComponent,
    NuevoModifTurnoComponent,
    NuevoModifClienteComponent,
    NuevoModifTratamientoComponent,
    NuevoModifProductoComponent,
    HistorialTurnosComponent,
    ContactoComponent,
    DashboardHomeComponent,
    ListaVentaComponent,
    NuevoModifVentaComponent,
    DetalleVentaComponent,
    EliminarComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
  ],
  entryComponents:[NuevoModifClienteComponent],
})
export class DashboardModule { }
