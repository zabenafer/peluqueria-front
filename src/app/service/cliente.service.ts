import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder ,Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteUrl = 'http://localhost:8080/cliente/';
  array = [];
  clienteActualizar = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient) {  }

  public lista(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteUrl + 'all');
  }

  public find(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.clienteUrl + `find/${id}`);
  }

  public findNombre(nombre: string): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteUrl + `findname/${nombre}`);
  }

  public findClienteByProvincia(id: number): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteUrl + `findclientesprovincia/${id}`);
  }

  public add(cliente: any): Observable<any> {
    return this.httpClient.post<any>(this.clienteUrl + `add`, cliente);
  }

  public update(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.clienteUrl + `update`, cliente);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.clienteUrl + `delete/${id}`);
  }
}
