import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from './../../../../environments/environment';
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
    {name:'Home', route:'dashboard-home',icon:'home'},
    {name:'Clientes', route:'clientes',icon:'people'},
    {name:'Tratamientos', route:'tratamientos',icon:'list'},
    {name:'Servicios', route:'servicios',icon:'edit_calendar'},
    {name:'Productos', route:'productos',icon:'storage'},
    {name:'Ventas', route:'ventas',icon:'receipt_long'},
    {name:'Cerrar Sesion',icon:'logout'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  onLogout() {
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser?.signOut();
    this.router.navigate(['']);

  }

}
