import { NuevoModifClienteComponent } from './../cliente/nuevo-modif-cliente.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  centered = true;
  radius: 1;
  constructor() { }

  ngOnInit(): void {
  }
  cards = [
    {
      title: 'CLIENTES',
      description: 'LISTAR / AGREGAR/ MODIFICAR / ELIMINAR',
      buttonText: 'Button',
      img: '../../../../assets/person.png',
      href: "dashboard/clientes"
    },
    {
      title: 'TRATAMIENTOS',
      description: 'LISTAR / AGREGAR/ MODIFICAR / ELIMINAR',
      buttonText: 'Button',
      img: '../../../../assets/Tratamiento.png',
      href: "dashboard/tratamientos"
    }
    ,
    {
      title: 'TURNOS',
      description: 'LISTAR / AGREGAR/ MODIFICAR / ELIMINAR',
      buttonText: 'Button',
      img: '../../../../assets/calendario.png',
      href: "dashboard/servicios"
    }
    ,
    {
      title: 'PRODUCTOS',
      description: 'LISTAR / AGREGAR/ MODIFICAR / ELIMINAR',
      buttonText: 'Button',
      img: '../../../../assets/productos.png',
      href: "dashboard/productos"
    }
    ,
    {
      title: 'VENTAS',
      description: 'LISTAR / AGREGAR/ MODIFICAR / ELIMINAR',
      buttonText: 'Button',
      img: '../../../../assets/person.png',
      href: "dashboard/ventas"
    }
  ];

}
