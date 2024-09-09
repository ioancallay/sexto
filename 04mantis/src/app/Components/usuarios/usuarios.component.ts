import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IUsuarios } from 'src/app/Interfaces/iusuarios';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  title: string = 'Usuarios';
  estado: string = 'Activo';
  listaUsuarios: IUsuarios[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  constructor(private ServicioUsuarios: UsuariosService) {}

  cargarUsuarios() {
    this.ServicioUsuarios.todos().subscribe((usuarios) => (this.listaUsuarios = usuarios));
  }

  eliminar(idUsuarios: number) {}
}
