import { CommonModule } from '@angular/common';
import { IProductos } from './../../Interfaces/iproductos';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [SharedModule, RouterLink, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  title: string = 'Lista de productos';
  listaProductos: IProductos[] = [];

  constructor() {}

  grabar() {}
  eliminar(IProductos: any) {}

  trackByFn(){}
}
