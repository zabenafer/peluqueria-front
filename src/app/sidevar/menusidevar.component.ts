import { ContactoComponent } from './../contacto/contacto.component';
import { ListaClienteComponent } from './../cliente/lista-cliente.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-menusidevar',
  templateUrl: './menusidevar.component.html',
  styleUrls: ['./menusidevar.component.css']
})
export class MenusidevarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav=[
    {name:'Home', route:'*',icon:'home'},
    {name:'Clientas', route:'clientes',icon:'people'},
    {name:'Tratamientos', route:'tratamientos',icon:'list'},
    {name:'Turnos', route:'turnos',icon:'edit_calendar'},
    {name:'Contacto', route:'contacto',icon:'perm_contact_calendar'},
    {name:'Cerrar Sesion', route:'contacto',icon:'logout'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

}
