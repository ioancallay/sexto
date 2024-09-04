import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUnidadmedida } from 'src/app/Interfaces/iunidadmedida';
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

  eliminar(idUnidad_Medida: number) {}
}
