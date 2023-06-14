import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reportes } from '../models/reportes';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  turnoUrl = 'http://localhost:8080/turno/';
  array = [];

  constructor(private httpClient: HttpClient) { }

  public findServiciosXMes(mes: number, anio: number): Observable<Reportes> {
    return this.httpClient.get<Reportes>(this.turnoUrl + `findcantturnosxtratamientos/${mes}/${anio}`);
  }

  public findTotalIngresosXMes(mes: number, anio: number): Observable<Reportes> {
    return this.httpClient.get<Reportes>(this.turnoUrl + `findtotalingresoxmes/${mes}/${anio}`);
  }

}
