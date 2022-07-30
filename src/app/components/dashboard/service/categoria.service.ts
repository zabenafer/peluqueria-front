import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categoria/';
  array = [];
  categoriaActualizar = new Subject<Categoria[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.categoriaUrl + 'all');
  }

  public add(categoria: any): Observable<any> {
    return this.httpClient.post<any>(this.categoriaUrl + `add`, categoria);
  }

  public update(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.categoriaUrl + `update`, categoria);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.categoriaUrl + `delete/${id}`);
  }

}
