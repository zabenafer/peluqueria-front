import { ReporteService } from './../service/reporte.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Reportes } from '../models/reportes';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReporteComponent implements OnInit {

  dateR1 = new FormControl(moment());
  dateR2 = new FormControl(moment());

  repo2: Reportes;
  repo2s: Reportes[];


  mes1: any;
  mes2: any;
  anio1: any;
  anio2: any;

  setMonthAndYearR1(normalizedMonthAndYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.dateR1.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateR1.setValue(ctrlValue);
    this.mes1 = ctrlValue.month() + 1;
    this.anio1 = ctrlValue.year();
    this.cargarReporte1();
    datepicker.close();
  }

  setMonthAndYearR2(normalizedMonthAndYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.dateR2.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateR2.setValue(ctrlValue);
    this.mes2 = ctrlValue.month() + 1;
    this.anio2 = ctrlValue.year();
    this.cargarReporte2();
    datepicker.close();
  }

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
  }

  cargarReporte1(): void {
    this.reporteService.findTotalIngresosXMes(this.mes1, this.anio1).subscribe(data => {
      this.repo2 = data;
      this.repo2.precio = data.precio;
      console.log(this.repo2);
    })
  }

  cargarReporte2(): void {
    this.reporteService.findServiciosXMes(this.mes2, this.anio2).subscribe(data => {
      this.repo2 = data;
      console.log(this.repo2);
    })
  }



}
