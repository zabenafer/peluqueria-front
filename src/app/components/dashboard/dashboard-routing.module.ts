import { ListaClienteComponent } from './cliente/lista-cliente.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialTurnosComponent } from './turno/historial-turnos.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento.component';
import { ListaTurnosComponent } from './turno/lista-turnos.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    { path: 'clientes', component: ListaClienteComponent },
    { path: 'tratamientos', component: ListaTratamientoComponent },
    { path: 'turnos', component: ListaTurnosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'verhistorial/:id', component: HistorialTurnosComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
