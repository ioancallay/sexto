import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IClientes } from 'src/app/Interfaces/iclientes';
import { ClientesService } from 'src/app/Services/clientes.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  title: string = 'Clientes';
  listaClientes: IClientes[] = [];

  constructor(private ServicioCliente: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.ServicioCliente.todos().subscribe((data) => (this.listaClientes = data));
  }

  eliminar(idClientes: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar el cliente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Cliente'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioCliente.eliminar(idClientes).subscribe((data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha completado el trabajo',
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarClientes();
        });
      }
    });
  }
}
