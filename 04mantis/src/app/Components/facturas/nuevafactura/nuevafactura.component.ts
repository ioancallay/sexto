import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { IFacturas } from 'src/app/Interfaces/ifacturas';
import { IClientes } from 'src/app/Interfaces/iclientes';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturasService } from 'src/app/Services/facturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevafactura',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './nuevafactura.component.html',
  styleUrl: './nuevafactura.component.scss'
})
export class NuevafacturaComponent implements OnInit {
  //variables o constantes
  titulo = 'Nueva Factura';
  listaClientes: IClientes[] = [];
  listaClientesFiltrada: IClientes[] = [];
  totalapagar: number = 0;
  // Valor_IVA: number = 0.15;
  fecha: string;
  //formgroup
  frm_factura: FormGroup;
  btn_save: string = 'Crear factura';
  idFactura = 0;
  mensaje: string;
  btn_confirm: string;
  ///////
  constructor(
    private ClienteServicio: ClientesService,
    private FacturaServicio: FacturasService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    // this.calculos();
    this.idFactura = parseInt(this.ruta.snapshot.paramMap.get('idFactura'));
    this.frm_factura = new FormGroup({
      Fecha: new FormControl('', Validators.required),
      Sub_total: new FormControl('', Validators.required),
      Sub_total_iva: new FormControl('', Validators.required),
      Valor_IVA: new FormControl('0.15', Validators.required),
      Clientes_idClientes: new FormControl('-', Validators.required)
    });
    this.mensaje = 'Desea crear la factura ';
    this.btn_confirm = 'Crear factura!';

    if (this.idFactura > 0) {
      this.FacturaServicio.uno(this.idFactura).subscribe((factura) => {
        let fechaAux = factura.Fecha.split(' ', 1);

        this.frm_factura.controls['Fecha'].setValue(fechaAux);
        this.frm_factura.controls['Sub_total'].setValue(factura.Sub_total);
        this.frm_factura.controls['Sub_total_iva'].setValue(factura.Sub_total_iva);
        this.frm_factura.controls['Valor_IVA'].setValue('0.15');
        this.frm_factura.controls['Clientes_idClientes'].setValue(factura.Clientes_idClientes);
        this.calculos();
        this.mensaje = 'Desea actualizar la factura ';
        this.btn_confirm = 'Actualizar factura!';
        this.titulo = 'Editar Factura';
        this.btn_save = 'Actualizar factura';
      });
    }
  }

  cargarClientes() {
    this.ClienteServicio.todos().subscribe({
      next: (data) => {
        this.listaClientes = data;
        this.listaClientesFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  grabar() {
    let factura: IFacturas = {
      idFactura: this.idFactura,
      Fecha: this.frm_factura.get('Fecha')?.value,
      Sub_total: this.frm_factura.get('Sub_total')?.value,
      Sub_total_iva: this.frm_factura.get('Sub_total_iva')?.value,
      Valor_IVA: this.frm_factura.get('Valor_IVA')?.value,
      Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
    };

    Swal.fire({
      title: 'Facturas',
      text: this.mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: this.btn_confirm
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idFactura > 0) {
          this.FacturaServicio.actualizar(factura).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/facturas']);
          });
        } else {
          this.FacturaServicio.insertar(factura).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/facturas']);
          });
        }
      }
    });
    // this.FacturaServicio.insertar(factura).subscribe((respuesta) => {
    //   if (parseInt(respuesta) > 0) {
    //     alert('Factura grabada');
    //     this.navegacion.navigate(['/facturas']);
    //   }
    // });
  }

  calculos() {
    let sub_total = this.frm_factura.get('Sub_total')?.value;
    let iva = this.frm_factura.get('Valor_IVA')?.value;
    let sub_total_iva = sub_total * iva;
    this.frm_factura.get('Sub_total_iva')?.setValue(sub_total_iva);
    this.totalapagar = parseInt(sub_total) + sub_total_iva;
  }

  cambio(objetoSleect: any) {
    let idCliente = objetoSleect.target.value;
    this.frm_factura.get('Clientes_idClientes')?.setValue(idCliente);
  }
}
