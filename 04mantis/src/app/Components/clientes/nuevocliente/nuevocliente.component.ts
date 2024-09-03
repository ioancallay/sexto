import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClientes } from 'src/app/Interfaces/iclientes';
import { ClientesService } from 'src/app/Services/clientes.service';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-nuevocliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevocliente.component.html',
  styleUrl: './nuevocliente.component.scss'
})
export class NuevoclienteComponent implements OnInit {
  
  frm_cliente: FormGroup;

  idClientes: number = 0;
  titulo: string = 'Nuevo Cliente';
  btn_save: string = 'Crear cliente';
  mensaje: string = 'Desea crear el cliente ';
  btn_confirm: string = 'Crear cliente!';

  constructor(
    private ServicioCliente: ClientesService,
    private navegacion: Router,
    private rutas: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.frm_cliente = new FormGroup({
      Nombres: new FormControl('', Validators.required),
      Direccion: new FormControl('', Validators.required),
      Telefono: new FormControl('', Validators.required),
      Cedula: new FormControl('', Validators.required),
      Correo: new FormControl('', [Validators.required, Validators.email])
    });

    this.idClientes = parseInt(this.rutas.snapshot.paramMap.get('idClientes'));
    console.log('Id: ' + this.idClientes);
    if (this.idClientes > 0) {
      this.ServicioCliente.uno(this.idClientes).subscribe((cliente) => {
        this.titulo = 'Editar Cliente';
        this.btn_save = 'Actualizar cliente';
        this.btn_confirm = 'Actualizar cliente!';
        this.mensaje = 'Desea actualizar el cliente ';

        //TODO: 1º forma para cargar datos
        this.ServicioCliente.uno(this.idClientes).subscribe((uncliente) => {
          this.frm_cliente.controls['Nombres'].setValue(uncliente.Nombres);
          this.frm_cliente.controls['Direccion'].setValue(uncliente.Direccion);
          this.frm_cliente.controls['Telefono'].setValue(uncliente.Telefono);
          this.frm_cliente.controls['Cedula'].setValue(uncliente.Cedula);
          this.frm_cliente.controls['Correo'].setValue(uncliente.Correo);
        });

        //TODO: 2ª forma para cargar datos
        // this.frm_cliente.setValue({
        //   Nombres: cliente.Nombres,
        //   Direccion: cliente.Direccion,
        //   Telefono: cliente.Telefono,
        //   Cedula: cliente.Cedula,
        //   Correo: cliente.Correo
        // });

        // this.frm_cliente.patchValue({
        //   Nombres: cliente.Nombres,
        //   Direccion: cliente.Direccion,
        //   Telefono: cliente.Telefono,
        //   Cedula: cliente.Cedula,
        //   Correo: cliente.Correo
        // });
      });
    }
  }

  grabar() {
    let cliente: IClientes = {
      idClientes: this.idClientes,
      Nombres: this.frm_cliente.controls['Nombres'].value,
      Direccion: this.frm_cliente.controls['Direccion'].value,
      Telefono: this.frm_cliente.controls['Telefono'].value,
      Cedula: this.frm_cliente.controls['Cedula'].value,
      Correo: this.frm_cliente.controls['Correo'].value
    };
    Swal.fire({
      title: 'Clientes',
      text: this.mensaje + this.frm_cliente.controls['Nombres'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: this.btn_confirm
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idClientes > 0) {
          this.ServicioCliente.actualizar(cliente).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 1000
            });
            this.navegacion.navigate(['/clientes']);
          });
        } else {
          this.ServicioCliente.insertar(cliente).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 1000
            });
            this.navegacion.navigate(['/clientes']);
          });
        }
      }
    });
  }

  cambiarLetras() {
    this.frm_cliente.controls['Nombres'].setValue(this.frm_cliente.controls['Nombres'].value.toUpperCase());
    this.frm_cliente.controls['Direccion'].setValue(this.frm_cliente.controls['Direccion'].value.toUpperCase());
    this.frm_cliente.controls['Correo'].setValue(this.frm_cliente.controls['Correo'].value.toLowerCase());
  }

  validadorCedulaEcuador(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) return null;
    if (cedula.length !== 10) return { cedulaInvalida: true };
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return { cedulaInvalida: true };
    const tercerDigito = parseInt(cedula.substring(2, 3), 10);
    if (tercerDigito < 0 || tercerDigito > 5) return { cedulaInvalida: true };
    const ultimoDigito = parseInt(cedula.substring(9, 10), 10);
    let suma = 0;
    const multiplicadores = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    for (let i = 0; i < 9; i++) {
      const digito = parseInt(cedula.substring(i, i + 1), 10) * multiplicadores[i];
      suma += digito > 9 ? digito - 9 : digito;
    }
    const resto = suma % 10;
    const digitoVerificador = resto === 0 ? 0 : 10 - resto;
    if (digitoVerificador !== ultimoDigito) return { cedulaInvalida: true };
    return null;
  }
}
