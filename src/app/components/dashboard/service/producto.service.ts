import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoUrl = 'http://localhost:8080/producto/';
  array = [];
  productoActualizar = new Subject<Producto[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoUrl + 'all');
  }

  public add(producto: any): Observable<any> {
    return this.httpClient.post<any>(this.productoUrl + `add`, producto);
  }

  public update(producto: Producto): Observable<Producto> {
    return this.httpClient.put<Producto>(this.productoUrl + `update`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoUrl + `delete/${id}`);
  }

}
