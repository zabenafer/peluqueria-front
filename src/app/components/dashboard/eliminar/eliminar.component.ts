import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  nombreComponente: String;
  datoEliminar: String;
  constructor(
    private dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String) { }

  ngOnInit(): void {

    this.nombreComponente = this.dialogRef.id;

    console.log(this.dialogRef.id);
    console.log(this.data);

  }

}
