import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListaClienteComponent } from './cliente/lista-cliente.component';
import { NuevoModifClienteComponent } from './cliente/nuevo-modif-cliente.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MenusidevarComponent } from './sidevar/menusidevar.component';
import { SharedModule } from './components/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HistorialTurnosComponent } from './turno/historial-turnos.component';
import { ListaTurnosComponent } from './turno/lista-turnos.component';
import { NuevoModifTurnoComponent } from './turno/nuevo-modif-turno.component';
import { NuevoModifTratamientoComponent } from './tratamiento/nuevo-modif-tratamiento.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento.component';
import { MAT_DATE_LOCALE,DateAdapter } from '@angular/material/core'
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    NuevoModifClienteComponent,
    MenusidevarComponent,
    ContactoComponent,
    HistorialTurnosComponent,
    ListaTurnosComponent,
    NuevoModifTurnoComponent,
    NuevoModifTratamientoComponent,
    ListaTratamientoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatMomentDateModule
  ],
  entryComponents:[NuevoModifClienteComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
