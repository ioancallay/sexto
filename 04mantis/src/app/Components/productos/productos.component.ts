import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProductos } from 'src/app/Interfaces/iproductos';
import { ProductoService } from 'src/app/Services/productos.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  listaProductos: IProductos[] = [];

  constructor(private ServicioProductos: ProductoService) {}

  ngOnInit(): void {
    this.cargaproductos();
  }

  cargaproductos() {
    this.ServicioProductos.todos().subscribe((data) => {
      this.listaProductos = data;
      console.log(data);
    });
  }
  trackByFn() {}

  eliminar(idProductos) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioProductos.eliminar(idProductos).subscribe((data) => {
          this.cargaproductos();
        });
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
      } else {
        Swal.fire('Error', 'Ocurrio un erro', 'error');
      }
    });
  }
}
