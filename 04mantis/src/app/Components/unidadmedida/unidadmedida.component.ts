import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUnidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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

  eliminar(idUnidad_Medida: number) {}
}
