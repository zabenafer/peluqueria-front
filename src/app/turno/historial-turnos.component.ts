import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Turno } from '../models/turno';
import { TurnoService } from '../service/turno.service';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.css']
})
export class HistorialTurnosComponent implements OnInit {

  id!: number;
  data: Turno[] = [];

  constructor(private turnoService: TurnoService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => { this.id = params['id'] })
  }

}
