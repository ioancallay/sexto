// angular import
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { IUsuarios } from '../../../Interfaces/iusuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  frm_login = new FormGroup({
    Nombre_Usuario: new FormControl('', [Validators.required, Validators.email]),
    Contrasenia: new FormControl('', Validators.required)
  });

  constructor(private ServicioUsuario: UsuariosService) {}

  //TODO: Captura los datos del frm_usuarios y llama al método login
  login() {
    let usuario: IUsuarios = {
      Nombre_Usuario: this.frm_login.controls['Nombre_Usuario'].value,
      Contrasenia: this.frm_login.controls['Contrasenia'].value
    };
    this.ServicioUsuario.login(usuario);
  }
  // public method
  SignInOptions = [
      {
        image: 'assets/images/authentication/google.svg',
        name: 'Google'
      },
      {
        image: 'assets/images/authentication/twitter.svg',
        name: 'Twitter'
      },
      {
        image: 'assets/images/authentication/facebook.svg',
        name: 'Facebook'
      }
  ];
}
