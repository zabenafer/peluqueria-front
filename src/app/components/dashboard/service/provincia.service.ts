import { Provincia } from '../models/provincia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  provinciaUrl = 'http://localhost:8080/provincia/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Provincia[]> {
    const cacheKey = 'provincias_cache';
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
      // Ya lo tenés cacheado → devolvés el array parseado como observable
      return of(JSON.parse(cache));
    } else {
      // No está cacheado → hacés la petición y guardás en localStorage
      return this.httpClient.get<Provincia[]>(this.provinciaUrl + 'all').pipe(
        tap(resp => {
          localStorage.setItem(cacheKey, JSON.stringify(resp));
        })
      );
    }
  }
}
