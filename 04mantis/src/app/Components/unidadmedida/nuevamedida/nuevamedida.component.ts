import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { IUnidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevamedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevamedida.component.html',
  styleUrl: './nuevamedida.component.scss'
})
export class NuevamedidaComponent implements OnInit {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;
  btn_save: string = 'Crear unidad de medida';
  idUnidad_Medida = 0;
  mensaje: string;
  btn_confirm: string;

  idUnidadMedida = 0;
  constructor(
    private ServicioUnidadMedida: UnidadmedidaService,
    private navegacion: Router,
    private rutas: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });
    this.mensaje = 'Desea crear la unidad de medida ';
    this.btn_confirm = 'Crear Unidad de Medida!';

    this.idUnidadMedida = parseInt(this.rutas.snapshot.paramMap.get('idUnidad_Medida'));
    if (this.idUnidadMedida > 0) {
      this.ServicioUnidadMedida.uno(this.idUnidadMedida).subscribe((unidadmedida) => {
        this.frm_UnidadMedida.controls['Detalle'].setValue(unidadmedida.Detalle);
        this.frm_UnidadMedida.controls['Tipo'].setValue(unidadmedida.Tipo);
        this.titulo = 'Editar Unidad de Medida';
        this.btn_save = 'Actualizar unidad de medida';
        this.mensaje = 'Desea actualizar la unidad de medida ';
        this.btn_confirm = 'Actualizar unidade de medida!';
      });
    }
  }
  cambio(objetoSleect: any) {
    let idUnidad_Medida = objetoSleect.target.value;
    this.frm_UnidadMedida.get('Tipo')?.setValue(idUnidad_Medida);
  }

  grabar() {
    let unidadmedida: IUnidadmedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: this.frm_UnidadMedida.get('Tipo')?.value
    };

    console.log(unidadmedida);

    Swal.fire({
      title: 'Unidad de Medida',
      text: this.mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: this.btn_confirm
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idUnidadMedida > 0) {
          unidadmedida.idUnidad_Medida = this.idUnidadMedida;
          this.ServicioUnidadMedida.actualizar(unidadmedida).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/unidadmedida']);
          });
        } else {
          this.ServicioUnidadMedida.insertar(unidadmedida).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/unidadmedida']);
          });
        }
      }
    });

    // if (this.idUnidadMedida == 0) {
    //   this.ServicioUnidadMedida.insertar(unidadmedida).subscribe((x) => {
    //     Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
    //     this.navegacion.navigate(['/unidadmedida']);
    //   });
    // } else {
    //   unidadmedida.idUnidad_Medida = this.idUnidadMedida;
    //   this.ServicioUnidadMedida.actualizar(unidadmedida).subscribe((x) => {
    //     Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
    //     this.navegacion.navigate(['/unidadmedida']);
    //   });
    // }
  }
}
