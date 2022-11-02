import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  ventaUrl = 'http://localhost:8080/venta/';
  array = [];
  ventaActualizar = new Subject<Venta[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(this.ventaUrl + 'all');
  }

  public add(venta: Venta): Observable<any> {
    console.log(venta);
    return this.httpClient.post<any>(this.ventaUrl + `add`, venta);
  }

  public update(venta: Venta): Observable<Venta> {
    return this.httpClient.put<Venta>(this.ventaUrl + `update`, venta);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ventaUrl + `delete/${id}`);
  }

}
