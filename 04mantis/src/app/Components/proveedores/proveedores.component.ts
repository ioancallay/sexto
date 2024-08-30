import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IProveedores } from 'src/app/Interfaces/iproveedores';
import { ProveedoresService } from 'src/app/Services/proveedores.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit {
  title = 'Lista de proveedores';
  listaProveedores: IProveedores[] = [];
  constructor(private ServicioProveedores: ProveedoresService) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.ServicioProveedores.todos().subscribe((proveedores) => {
      this.listaProveedores = proveedores;
    });
  }

  eliminar(idProveedores: number) {
    Swal.fire({
      title: 'Proveedores',
      text: 'Esta seguro que desea eliminar el proveedor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar proveedor!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioProveedores.eliminar(idProveedores).subscribe((data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha completado el trabajo',
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarProveedores();
        });
      }
    });
  }
}
