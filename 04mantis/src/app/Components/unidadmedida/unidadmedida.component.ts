import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUnidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent {
  listaunidades: IUnidadmedida[] = [];
  constructor(private ServicioUnidadMedida: UnidadmedidaService) {}
  ngOnInit(): void {
    this.cargarUnidad();
  }

  cargarUnidad() {
    this.ServicioUnidadMedida.todos().subscribe((unidadmedida) => (this.listaunidades = unidadmedida));
  }

  eliminar(idUnidad_Medida: number) {
    Swal.fire({
      title: 'Unidad de Medida',
      text: 'Esta seguro que desea eliminar la unidad de medida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Unidad de Medida'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioUnidadMedida.eliminar(idUnidad_Medida).subscribe((data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha completado el trabajo',
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarUnidad();
        });
      }
    });
  }
}
