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


@NgModule({
  declarations: [
    DashboardComponent,
    ListaClienteComponent,
    NuevoModifClienteComponent,
    MenusidevarComponent,
    ContactoComponent,
    HistorialTurnosComponent,
    ListaTurnosComponent,
    NuevoModifTurnoComponent,
    NuevoModifTratamientoComponent,
    ListaTratamientoComponent

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
