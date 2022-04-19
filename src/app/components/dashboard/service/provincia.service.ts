import { Provincia } from '../models/provincia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  provinciaUrl = 'http://localhost:8080/provincia/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Provincia[]> {
    return this.httpClient.get<Provincia[]>(this.provinciaUrl + 'all');
  }
}
