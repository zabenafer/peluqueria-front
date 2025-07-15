import { Localidad } from '../models/localidad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

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
    const cacheKey = `localidades_prov_${idProvincia}`;
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
      return of(JSON.parse(cache));
    } else {
      return this.httpClient.get<Localidad[]>(this.localidadUrl + `findlocalidadxprovincia/${idProvincia}`).pipe(
        tap((resp) => {
          localStorage.setItem(cacheKey, JSON.stringify(resp));
        })
      );
    }
  }
}
