import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedorUrl = 'http://localhost:8080/proveedor/';
  array = [];
  proveedorActualizar = new Subject<Proveedor[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Proveedor[]> {
    return this.httpClient.get<Proveedor[]>(this.proveedorUrl + 'all');
  }

  public add(proveedor: any): Observable<any> {
    return this.httpClient.post<any>(this.proveedorUrl + `add`, proveedor);
  }

  public update(proveedor: Proveedor): Observable<Proveedor> {
    return this.httpClient.put<Proveedor>(this.proveedorUrl + `update`, proveedor);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proveedorUrl + `delete/${id}`);
  }

}
