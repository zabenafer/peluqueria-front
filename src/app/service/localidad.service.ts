import { Localidad } from './../models/localidad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  localidadUrl = 'http://localhost:8080/localidad/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Localidad[]> {
    return this.httpClient.get<Localidad[]>(this.localidadUrl + 'all');
  }

  public findLocalidadByProvincia(idProvincia: number): Observable<Localidad[]> {
    return this.httpClient.get<Localidad[]>(this.localidadUrl + `findlocalidadxprovincia/${idProvincia}`);
  }

}
