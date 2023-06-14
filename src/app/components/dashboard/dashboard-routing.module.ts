import { ReporteComponent } from './reporte/reporte.component';
import { NuevoModifVentaComponent } from './venta/nuevo-modif-venta.component';
import { ListaClienteComponent } from './cliente/lista-cliente.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialTurnosComponent } from './turno/historial-turnos.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento.component';
import { ListaTurnosComponent } from './turno/lista-turnos.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ListaVentaComponent } from './venta/lista-venta.component';
import { DetalleVentaComponent } from './venta/detalle-venta.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    { path: 'clientes', component: ListaClienteComponent },
    { path: 'tratamientos', component: ListaTratamientoComponent },
    { path: 'servicios', component: ListaTurnosComponent },
    { path: 'productos', component: ListaProductoComponent },
    { path: 'ventas', component: ListaVentaComponent },
    { path: 'reportes', component: ReporteComponent },
    { path: 'regventa', component: NuevoModifVentaComponent},
    { path: 'verhistorial/:id', component: HistorialTurnosComponent},
    { path: 'verdetalleventa/:id', component: DetalleVentaComponent},
    { path: 'dashboard-home', component: DashboardHomeComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
