import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Tratamiento } from '../models/tratamiento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  tratamientoUrl = 'http://localhost:8080/tratamiento/';
  array = [];
  tratamientoActualizar = new Subject<Tratamiento[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Tratamiento[]> {
    return this.httpClient.get<Tratamiento[]>(this.tratamientoUrl + 'all');
  }

  public add(tratamiento: any): Observable<any> {
    return this.httpClient.post<any>(this.tratamientoUrl + `add`, tratamiento);
  }

  public update(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.httpClient.put<Tratamiento>(this.tratamientoUrl + `update`, tratamiento);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.tratamientoUrl + `delete/${id}`);
  }

}
