import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProveedores } from 'src/app/Interfaces/iproveedores';
import { ProveedoresService } from 'src/app/Services/proveedores.service';

@Component({
  selector: 'app-nuevoproveedor',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nuevoproveedor.component.html',
  styleUrl: './nuevoproveedor.component.scss'
})
export class NuevoproveedorComponent implements OnInit {
  constructor(
    private ServicioProveedores: ProveedoresService,
    private navegacion: Router,
    private rutas: ActivatedRoute
  ) {}

  idProveedores: number = 0;
  Nombre_Empresa;
  Direccion;
  Telefono;
  Contacto_Empresa;
  Telefono_Contacto;
  titulo: string = 'Agregar Proveedor';
  btn_save: string = 'Crear proveedor';
  btn_confirm: string = 'Crear proveedor!';
  mensaje: string = 'Desea crear el proveedor ';

  //   idProveedores
  // Nombre_Empresa
  // Direccion
  // Telefono
  // Contacto_Empresa
  // Telefono_Contacto

  ngOnInit(): void {
    this.idProveedores = parseInt(this.rutas.snapshot.paramMap.get('idProveedores'));
    console.log('IdProveedor ' + this.idProveedores);

    if (this.idProveedores > 0) {
      this.titulo = 'Editar Proveedor';
      this.btn_save = 'Actualizar proveedor';
      this.btn_confirm = 'Editar proveedor!';
      this.mensaje = 'Desea editar el proveedor ';
      this.ServicioProveedores.uno(this.idProveedores).subscribe((proveedor) => {
        this.Nombre_Empresa = proveedor.Nombre_Empresa;
        this.Direccion = proveedor.Direccion;
        this.Telefono = proveedor.Telefono;
        this.Contacto_Empresa = proveedor.Contacto_Empresa;
        this.Telefono_Contacto = proveedor.Telefono_Contacto;
      });
    }
  }

  grabar() {
    let iproveedor: IProveedores = {
      idProveedores: 0,
      Nombre_Empresa: this.Nombre_Empresa,
      Direccion: this.Direccion,
      Telefono: this.Telefono,
      Contacto_Empresa: this.Contacto_Empresa,
      Telefono_Contacto: this.Telefono_Contacto
    };

    if (this.idProveedores == 0 || isNaN(this.idProveedores)) {
      this.ServicioProveedores.insertar(iproveedor).subscribe((respuesta) => {
        if (parseInt(respuesta) > 1) {
          alert('Grabado con exito');
          this.navegacion.navigate(['/proveedores']);
        } else {
          alert('Error al grabar');
        }
      });
    } else {
      iproveedor.idProveedores = this.idProveedores;
      console.log(iproveedor);
      this.ServicioProveedores.actualizar(iproveedor).subscribe((respuesta) => {
        if (parseInt(respuesta) > 1) {
          alert('Actualizado con exito');
          this.navegacion.navigate(['/proveedores']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
  }
}
