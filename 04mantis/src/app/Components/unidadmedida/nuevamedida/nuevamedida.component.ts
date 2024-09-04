import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevamedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevamedida.component.html',
  styleUrl: './nuevamedida.component.scss'
})
export class NuevamedidaComponent {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;
  cambio(objetoSleect: any) {
    let idCliente = objetoSleect.target.value;
    // this.frm_factura.get('Clientes_idClientes')?.setValue(idCliente);
  }
  grabar() {}
}
