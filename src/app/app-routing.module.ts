import { ListaTurnosComponent } from './turno/lista-turnos.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ListaClienteComponent } from './cliente/lista-cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialTurnosComponent } from './turno/historial-turnos.component';

const routes: Routes = [
  {path: '', component: ListaClienteComponent},
  {path: 'clientes', component: ListaClienteComponent},
  {path: 'tratamientos', component: ListaTratamientoComponent},
  {path: 'turnos', component: ListaTurnosComponent},
  {path: 'verhistorial/:id', component: HistorialTurnosComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
