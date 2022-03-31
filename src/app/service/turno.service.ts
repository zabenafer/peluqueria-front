import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turnoUrl = 'http://localhost:8080/turno/';
  array = [];
  turnoActualizar = new Subject<Turno[]>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Turno[]> {
    return this.httpClient.get<Turno[]>(this.turnoUrl + 'all');
  }

  public add(turno: any): Observable<any> {
    return this.httpClient.post<any>(this.turnoUrl + `add`, turno);
  }

  public update(turno: Turno): Observable<Turno> {
    return this.httpClient.put<Turno>(this.turnoUrl + `update`, turno);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.turnoUrl + `delete/${id}`);
  }

}
